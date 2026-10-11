import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import libraryImage from "../images/back/login.png";

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", color: "" });
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = details;
    if (email.length < 9) {
      setMessage({ text: "Please enter a valid email address.", color: "red" });
      return;
    }
    if (!password) {
      setMessage({ text: "Password field cannot be empty.", color: "red" });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        { email, password },
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        const backendError = error.response.data.error;
        const safeStringMessage =
          typeof backendError === "object"
            ? backendError?.message || JSON.stringify(backendError)
            : backendError;
        setMessage({
          text: safeStringMessage || "Invalid Credentials",
          color: "red",
        });
        console.error("Backend login error:", safeStringMessage);
      } else {
        setMessage({
          text: "Server unreachable. Is your backend running?",
          color: "red",
        });
      }
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setDetails((previous) => ({ ...previous, [id]: value }));
  };

  return (
    <div className="auth-page auth-page-login page-enter">
      <section className="auth-shell" aria-labelledby="login-title">
        <div className="auth-artwork">
          <img src={libraryImage} alt="" />
          <div className="auth-artwork-copy">
            <h2>Welcome back</h2>
            <p>
              Pick up where your curiosity left off and continue your learning
              journey.
            </p>
          </div>
        </div>
        <div className="auth-content">
          <h1 id="login-title">Sign in</h1>
          <p className="auth-intro">
            Access your Digital Knowledge Center account.
          </p>
          <form onSubmit={handleLogin}>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={details.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="form-control"
              autoComplete="email"
              required
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              placeholder="Enter your password"
              value={details.password}
              className="form-control"
              autoComplete="current-password"
              required
            />
            <div className="auth-options">
              <label className="d-inline-flex align-items-center gap-2">
                <input type="checkbox" id="check" />
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            {message.text && (
              <p className="auth-message is-error" role="alert">
                {message.text}
              </p>
            )}
            <button
              type="submit"
              id="login"
              className="btn btn-primary auth-submit w-100"
            >
              Sign in
            </button>
            <div className="text-center my-3 text-secondary">or</div>
            <button type="button" className="btn btn-light border w-100">
              Login with google
            </button>
          </form>
          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
