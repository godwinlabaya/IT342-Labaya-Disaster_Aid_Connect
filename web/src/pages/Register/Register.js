import { useState } from "react";
import "./Register.css";
import { supabase } from "../../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create account in Supabase Auth
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

      <div className="auth-right">
        <div className="auth-card">
          <h2>Register</h2>

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

          <div className="auth-link">
            <Link to="/">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}