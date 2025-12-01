const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');




const app = express();
//const port = 3000;
const PORT = process.env.PORT || 8000;
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

app.use(express.json());      // <-- Enable JSON body parsing
app.use(cors());

app.use('/uploads', express.static('uploads'));



const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'doctorplus',
  password: 'oracle',
  port: 5432,
});





const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });








function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('=== authenticateToken ===');
  console.log('Received auth header:', authHeader);
  console.log('Parsed token:', token);

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    console.log('Token verified, user:', req.user);
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
    console.log("Request body:", req.body); // DEBUG: check incoming data

    const { name, email, password, city, phone_number, address, birth_date } = req.body;

    // Validate all required fields
    if (
      !name ||
      !email ||
      !password ||
      !city ||
      !phone_number ||
      !address ||
      !birth_date
    ) {
      return res.status(400).json({
        message: 'Missing required fields.',
      });
    }

    // Optional: validate phone number is digits only
    if (!/^\d+$/.test(phone_number)) {
      return res.status(400).json({
        message: 'Phone number must contain only digits.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check if email already exists
    const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({
        message: 'Email already registered. Please use a different email address.',
      });
    }

    // Insert the user
    const result = await pool.query(
      'INSERT INTO users (name, email, password, city, phone_number, address, birth_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, email, hashedPassword, city, phone_number, address, birth_date]
    );

    res.status(201).json({
      message: 'User registered successfully!',
      user: result.rows[0],
    });

  } catch (err) {
    console.error(err);

    if (err.code === '23505') {
      return res.status(400).json({
        message: 'Email already exists. Please choose another email.',
      });
    }

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
// GET /me
app.get('/me', authenticateToken, async (req, res) => {
  try {
    console.log("=== /me called ===");
    console.log("User from token:", req.user);

    if (!req.user || !req.user.id) {
      console.warn("Missing user ID in token");
      return res.status(401).json({ message: "Invalid token" });
    }

    const result = await pool.query(
      'SELECT id, name, email, phone_number, address, city, birth_date, profile_picture FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      console.warn("User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }

    const u = result.rows[0];
    console.log("DB user:", u);

    // Make sure profile_picture is an absolute path the frontend can fetch
    res.json({
      user: {
        id: u.id,
        name: u.name,
        email: u.email,
        phone_number: u.phone_number,
        address: u.address,
        city: u.city,
        birth_date: u.birth_date,
        profile_picture: u.profile_picture ? `/uploads/${u.profile_picture}` : null
      }
    });

  } catch (err) {
    console.error("Error /me:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /change-profile-picture
app.put(
  '/change-profile-picture',
  authenticateToken,
  upload.single('image'),
  async (req, res) => {
    try {
      console.log("=== /change-profile-picture called ===");
      console.log("User from token:", req.user);

      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Invalid token" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Image file required" });
      }

      const filename = req.file.filename;
      console.log("Uploaded file:", filename);

      await pool.query(
        "UPDATE users SET profile_picture = $1 WHERE id = $2",
        [filename, req.user.id]
      );

      console.log("Profile picture updated for user:", req.user.id);

      res.json({
        message: "Profile picture updated",
        filename,
        imageUrl: `/uploads/${filename}` // frontend should append backend host
      });

    } catch (err) {
      console.error("Error /change-profile-picture:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);












//update your profile
app.put('/me/update', authenticateToken, upload.single('profile_picture'), async (req, res) => {
  const { name, email, phone_number, address, city } = req.body;
  const userId = req.user.id;

  try {
    // Dynamically build the query to update only provided fields
    const fields = [];
    const values = [];
    let counter = 1;

    if (name) { fields.push(`name = $${counter++}`); values.push(name); }
    if (email) { fields.push(`email = $${counter++}`); values.push(email); }
    if (phone_number) { fields.push(`phone_number = $${counter++}`); values.push(phone_number); }
    if (address) { fields.push(`address = $${counter++}`); values.push(address); }
    if (city) { fields.push(`city = $${counter++}`); values.push(city); }

    // Handle profile picture
    if (req.file) {
      fields.push(`profile_picture = $${counter++}`);
      values.push(req.file.filename);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No data provided to update." });
    }

    values.push(userId);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${counter} RETURNING *`;
    const result = await pool.query(query, values);

    const updatedUser = result.rows[0];

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone_number: updatedUser.phone_number,
        address: updatedUser.address,
        city: updatedUser.city,
        birth_date: updatedUser.birth_date,
        profile_picture: updatedUser.profile_picture ? `/uploads/${updatedUser.profile_picture}` : null
      }
    });

  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error while updating profile" });
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



//change password route


// change password route
app.put('/change-password',authenticateToken, async (req, res) => {
  try {
    const {oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: 'Missing required fields.',
      });
    }

    // get the user
const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    const user = userResult.rows[0];

    // compare passwords
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(401).json({ message: "Old password is incorrect." });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password in DB
    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashedPassword, userId]
    );

    res.json({ message: "Password updated successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});





// Forgot password route (simple version)
app.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required." });
    }

    // Check if user exists
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User with this email not found." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password in DB
    const updateResult = await pool.query(
      "UPDATE users SET password = $1 WHERE email = $2 RETURNING id, email",
      [hashedPassword, email]
    );

    if (updateResult.rows.length === 0) {
      return res.status(500).json({ message: "Failed to update password." });
    }

    res.json({ message: "Password updated successfully. You can now log in with your new password." });

  } catch (err) {
    console.error("Forgot password error:", err);  // <-- this will print the real error
    res.status(500).json({ message: "Server error." });
  }
});








app.post("/book", authenticateToken, async (req, res) => {
  try {
    const { date, time } = req.body;
    const userId = req.user.id; // from authenticateToken middleware

    if (!date || !time) {
      return res.status(400).json({ message: "Date and time are required" });
    }

    const result = await pool.query(
      "INSERT INTO appointments (user_id, date, time) VALUES ($1, $2, $3) RETURNING *",
      [userId, date, time]
    );

    res.json({ message: "Appointment booked successfully", appointment: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});





app.get("/appointments/previous", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // from authenticateToken middleware

    const result = await pool.query(
      "SELECT * FROM appointments WHERE user_id = $1 AND date < CURRENT_DATE ORDER BY date DESC, time DESC",
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});






app.get("/appointments/upcoming", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM appointments WHERE user_id = $1 AND date >= CURRENT_DATE ORDER BY date ASC, time ASC",
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});















app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});