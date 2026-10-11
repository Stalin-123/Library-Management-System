import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import libraryImage from '../images/back/login.png';

export default function Register() {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        fullName: '',
        email: '',
        password: '',
        cpassword: '',
    });
    const [message, setMessage] = useState({ text: '', color: '' });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { id, value } = event.target;
        const nextDetails = { ...details, [id]: value };
        setDetails(nextDetails);

        if (id === 'cpassword' || id === 'password') {
            if (!nextDetails.cpassword) {
                setMessage({ text: '', color: '' });
            } else if (nextDetails.password !== nextDetails.cpassword) {
                setMessage({ text: 'Passwords should match', color: 'red' });
            } else {
                setMessage({ text: 'Passwords matched', color: 'green' });
            }
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const { fullName, email, password, cpassword } = details;
        if (email.length < 9) {
            setMessage({ text: 'Email must be a valid email', color: 'red' });
            return;
        }
        if (password.length < 6) {
            setMessage({ text: 'Passwords must be greater than 6', color: 'red' });
            return;
        }
        if (password !== cpassword) {
            setMessage({ text: 'Passwords should match', color: 'red' });
            return;
        }
        if (!termsAccepted) {
            setMessage({ text: 'Please accept the Terms of Service and Privacy Policy to register.', color: 'red' });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/register',
                { fullName, email, password },
            );
            const successMessage = typeof response.data.message === 'string'
                ? response.data.message
                : 'Account created successfully. Redirecting to login…';
            setDetails({ fullName: '', email: '', password: '', cpassword: '' });
            setTermsAccepted(false);
            setMessage({ text: successMessage, color: 'green' });
            window.setTimeout(() => navigate('/login', { replace: true }), 900);
        } catch (error) {
            const backendMessage = error.response?.data?.error || error.response?.data?.message;
            const safeMessage = typeof backendMessage === 'object'
                ? backendMessage?.message
                : backendMessage;
            setMessage({
                text: safeMessage || (error.response
                    ? 'Unable to create your account. Please try again.'
                    : 'Server unreachable. Please try again later.'),
                color: 'red',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page page-enter">
            <section className="auth-shell" aria-labelledby="register-title">
                <div className="auth-artwork">
                    <img src={libraryImage} alt="" />
                    <div className="auth-artwork-copy">
                        <h2>Make room for discovery</h2>
                        <p>Create your account and explore a library built for curious minds.</p>
                    </div>
                </div>
                <div className="auth-content">
                    <h1 id="register-title">Create your account</h1>
                    <p className="auth-intro">A few details are all it takes to get started.</p>
                    <form onSubmit={handleRegister}>
                        <label htmlFor="fullName" className="form-label">Full name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Enter your name"
                            value={details.fullName}
                            onChange={handleChange}
                            className="form-control"
                            autoComplete="name"
                            required
                        />
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            value={details.email}
                            onChange={handleChange}
                            className="form-control"
                            autoComplete="email"
                            required
                        />
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="At least 6 characters"
                            value={details.password}
                            onChange={handleChange}
                            className="form-control"
                            autoComplete="new-password"
                            required
                        />
                        <label htmlFor="cpassword" className="form-label">Confirm password</label>
                        <input
                            type="password"
                            id="cpassword"
                            placeholder="Enter your password again"
                            value={details.cpassword}
                            onChange={handleChange}
                            className="form-control"
                            autoComplete="new-password"
                            required
                        />
                        <label className="d-flex align-items-start gap-2 mt-1 text-secondary small">
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(event) => setTermsAccepted(event.target.checked)}
                            />
                            <span>
                                I agree to the <a href="#">Terms of Service</a> and{' '}
                                <a href="#">Privacy Policy</a>
                            </span>
                        </label>
                        {message.text && (
                            <p
                                className={`auth-message ${message.color === 'green' ? 'is-success' : 'is-error'}`}
                                role={message.color === 'green' ? 'status' : 'alert'}
                                aria-live="polite"
                            >
                                {message.text}
                            </p>
                        )}
                        <button
                            type="submit"
                            id="login"
                            className="btn btn-primary auth-submit w-100"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating account…' : 'Create account'}
                        </button>
                    </form>
                    <p className="auth-switch">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </section>
        </div>
    );
}
