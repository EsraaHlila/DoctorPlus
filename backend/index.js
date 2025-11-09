const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');



const app = express();
const port = 3000;
const PORT = process.env.PORT || 8000;
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

app.use(express.json());      // <-- Enable JSON body parsing
app.use(cors());



const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'doctorplus',
  password: 'oracle',
  port: 5432,
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Received token:', token); // Log the token received

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err); // Log the JWT error
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}


function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied:insufficient permissions' });
    }
    next();
  };
}
//example route
app.get('/', (req, res) => {
  res.send('doctorplus backend is running!');
});




//register route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, /*role='patient',*/ city, /*available = false*/ phone_number, address } = req.body;

    if (!name || !email || !password || !city || !phone_number || !address ) /*!role)*/ {
          return res.status(400).json({
            message: 'Missing required fields ',
          });
        }


    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // to get the role id from the roles table in order to select a valid role
    //const roleResult = await pool.query('SELECT id FROM roles WHERE name = $1', [role]);


    /*const validRoles = ['admin', 'doctor', 'patient', 'nurse'];
        if (!validRoles.includes(role)) {
          return res.status(400).json({
            message: 'Invalid role selected.',
            validRoles: validRoles
          });
        }*/



    const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
          return res.status(400).json({
            message: 'Email already registered. Please use a different email address.',
          });
        }

    const result = await pool.query(
      'INSERT INTO users (name, email, password, city,phone_number, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, hashedPassword, /*role, available,*/ city, phone_number, address]
    );

    res.status(201).json({
      message: 'User registered successfully!',
    });
  } catch (err) {
    console.error(err);

    //email already exists error
    if (err.code === '23505') {
          return res.status(400).json({
            message: 'Email already exists. Please choose another email.',
          });
        }

        // a general server error
        res.status(500).json({
          message: 'Server error. Please try again later.',
        });

  }
});




//login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    //find the user by searching for the corresponding email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log(result)

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];

    //to compare the password after rehashing
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
        const accessToken = jwt.sign(
		{
			id: user.id,
			email: user.email,
			/*role: user.role*/
			},
			JWT_SECRET,
			{ expiresIn: '6h' } // Short-lived access token
			);

			const refreshToken = jwt.sign(
			{ id: user.id },
			JWT_SECRET,
				{ expiresIn: '30d' } // Long-lived refresh token
			);


console.log('Login request for:', email);
console.log('User found:', user);
console.log('Password match:', isMatch);
console.log('Tokens generated:', { accessToken, refreshToken });

res.status(200).json({
  message: 'Login successful!',
  accessToken,
  refreshToken,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  }
});

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



//get your profile


app.get('/me', authenticateToken, async (req, res) => {
  try {
    // if no user in token (unauthorized)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Please sign in first.' });
    }

    const result = await pool.query(
      'SELECT id, name, email, address, phone_number, city FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone_number,
        address: user.address,
        city: user.city,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});











//update your profile
app.put('/me/update', authenticateToken, async (req, res) => {
  const { name, email, phone_number, address, city } = req.body;

  try {
    await pool.query(
      `UPDATE users
       SET name = $1, email = $2, phone_number = $3, address = $4, city = $5
       WHERE id = $6`,
      [name, email, phone_number, address, city, req.user.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
});

// delete your account
app.delete('/me/delete', authenticateToken, async (req, res) => {
  try {
    // Delete user by ID (from the decoded token)
    await pool.query('DELETE FROM users WHERE id = $1', [req.user.id]);

    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).json({ message: 'Server error while deleting account' });
  }
});





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});