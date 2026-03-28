import { useState } from "react";
import { supabase } from "../../supabaseClient";
import "./Login.css"; 
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>LABORATORY ACTIVITY</h1>
        <p>
          Secure authentication platform built using React and Spring Boot.
          Please login to continue.
        </p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
          </form>

          <div className="auth-link">
            <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
