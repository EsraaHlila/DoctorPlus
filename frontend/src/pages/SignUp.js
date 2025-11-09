import React from "react";

const SignupPage = () => {
  return (
    <div className="flex h-screen">
      {/* LEFT SIDE - IMAGE + TEXT */}
      <div
        className="w-1/2 bg-cover bg-center flex flex-col justify-center px-20 text-white"
        style={{
          backgroundImage:
            "url('/images/your-image.jpg')", // 👈 Replace with your own image path
          backgroundColor: "rgba(0, 0, 128, 0.6)",
          backgroundBlendMode: "overlay",
        }}
      >
        <h1 className="text-6xl font-bold mb-6">Hello World.</h1>
        <p className="text-lg leading-relaxed">
          <strong>Reserve Your Appointment</strong>
          <br />
          Secure your visit with Dr. [Name] in just a few moments.
        </p>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-1/2 flex items-center justify-center bg-white p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Register</h2>
          <p className="text-sm text-gray-500 mb-8">
            Talk to a physician day or night, no matter where you are.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Help your sick child get better, quicker.
            </a>
          </p>
          <form className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border p-3 rounded w-1/2"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border p-3 rounded w-1/2"
              />
            </div>
            <input
              type="date"
              placeholder="Birth date"
              className="border p-3 rounded w-full"
            />
            <input
              type="text"
              placeholder="Street Address"
              className="border p-3 rounded w-full"
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="City"
                className="border p-3 rounded w-1/2"
              />
              <input
                type="text"
                placeholder="State"
                className="border p-3 rounded w-1/2"
              />
            </div>
            <input
              type="text"
              placeholder="Zip Code"
              className="border p-3 rounded w-full"
            />
            <input
              type="text"
              placeholder="Credit Card #"
              className="border p-3 rounded w-full"
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="CCV"
                className="border p-3 rounded w-1/2"
              />
              <input
                type="text"
                placeholder="Expiration Date"
                className="border p-3 rounded w-1/2"
              />
            </div>

            <div className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" />
              <label className="text-sm text-gray-600">
                I accept terms and conditions & privacy policy
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
