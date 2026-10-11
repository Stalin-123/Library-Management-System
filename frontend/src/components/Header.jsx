import { Link } from 'react-router-dom';
import logoImg from '../images/courses/logo.png';

export default function Header() {
    return (
        <header className="site-header">
            <div className="container-fluid p-0">
                <Link to="/" className="site-brand d-inline-flex align-items-center text-decoration-none">
                    <img src={logoImg} alt="Digital Knowledge Center logo" className="me-3" />
                    <div>
                        <span className="site-brand-name">
                            Digital Knowledge Center
                        </span>
                        <small className="site-brand-tagline d-none d-sm-block">
                            Your Gateway to Infinite Knowledge
                        </small>
                    </div>
                </Link>
            </div>
        </header>
    );
}