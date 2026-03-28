import { useState } from "react";
import "./Register.css";  // ← Make sure this path is correct
import { supabase } from "../../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create account in Supabase Auth
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // 2. Insert into your custom users table
    if (data.user) {
      const { error: insertError } = await supabase.from("users").insert([
        {
          userID: data.user.id, // match auth user ID
          email: form.email,
          passwordHash: form.password, // ⚠️ plain text (for school only)
          firstName: form.firstName,
          lastName: form.lastName,
        },
      ]);

      if (insertError) {
        alert(insertError.message);
        return;
      }
    }

    alert("Check your email for confirmation!");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>LABORATORY ACTIVITY</h1>
        <p>Create your account to access the secure dashboard system.</p>
      </div>

      {/* RIGHT PANEL */}
      <div className="register-right">

        <div className="register-card">

          <h2>Create Account</h2>
          <p className="subtitle">Join DisasterAidConnect and start your journey</p>

          <form onSubmit={handleSubmit}>
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Register</button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="login-text">
            Already have an account? <Link to="/">Log in</Link>
          </p>

        </div>

      </div>

    </div>
  );
}