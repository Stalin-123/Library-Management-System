import { Link } from 'react-router-dom';
import libraryImage from '../images/back/login.png';

export default function Main() {
    return (
        <div className="landing-page page-enter">
            <section className="landing-hero">
                <div className="landing-copy">
                    <span className="eyebrow">A better way to discover</span>
                    <h1>Your next great read starts here.</h1>
                    <p>
                        Find your place in a world of ideas. Explore the library, keep your
                        learning organized, and make every visit count.
                    </p>
                    <div className="landing-actions">
                        <Link to="/login" className="btn btn-primary">Sign in</Link>
                        <Link to="/register" className="btn btn-outline-primary">Create an account</Link>
                    </div>
                </div>
                <div className="landing-art">
                    <img src={libraryImage} alt="A quiet, sunlit library reading space" />
                    <div className="landing-note">Discover. Learn. Grow.</div>
                </div>
            </section>
            <footer className="landing-footer">A welcoming space for curious minds.</footer>
        </div>
    );
}