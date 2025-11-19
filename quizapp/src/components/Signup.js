import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    terms: false,
  });

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle form field updates
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Initial form validation + OTP generation
  const handleInitialSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, phone, terms } = formData;

    if (!username || !email || !password || !confirmPassword || !phone) {
      alert("Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!terms) {
      alert("You must agree to the terms to continue.");
      return;
    }

    // Generate OTP
    const otpGenerated = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpGenerated);
    setShowOtpInput(true);

    console.log(`OTP for ${email}: ${otpGenerated}`);
    alert("OTP generated. Check console for the code.");
  };

  // Register user in backend after OTP verification
  const registerUser = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Registration failed.");
        return;
      }

      alert("Registration successful. You may now log in.");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      alert("Server error. Please try again later.");
    }
  };

  // OTP submission handling
  const handleOtpSubmit = (e) => {
    e.preventDefault();

    if (otp.trim() !== generatedOtp.trim()) {
      alert("Incorrect OTP. Please try again.");
      return;
    }

    // OTP validated — proceed to backend registration
    registerUser();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Your Account</h2>

      {/* Step 1: User Details */}
      {!showOtpInput && (
        <form onSubmit={handleInitialSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              style={{ marginRight: "10px" }}
            />
            I agree to the Terms and Conditions
          </label>

          <button type="submit" style={styles.button}>
            Continue
          </button>
        </form>
      )}

      {/* Step 2: OTP Verification */}
      {showOtpInput && (
        <form onSubmit={handleOtpSubmit} style={styles.form}>
          <p>Please enter the OTP sent to your email</p>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            {loading ? "Processing..." : "Verify & Create Account"}
          </button>
        </form>
      )}

      <p style={styles.text}>
        Already registered?{" "}
        <Link to="/login" style={styles.link}>
          Log in here
        </Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "420px",
    margin: "50px auto",
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: { marginBottom: "20px", color: "#333" },
  form: { display: "flex", flexDirection: "column" },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  checkboxLabel: { marginBottom: "15px", fontSize: "14px", color: "#555" },
  button: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  text: { marginTop: "20px", fontSize: "14px" },
  link: { color: "#4CAF50", textDecoration: "underline" },
};

export default Signup;
