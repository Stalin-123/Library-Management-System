import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navigationLinks = [
    { label: "Home", to: "/dashboard", end: true },
    { label: "About", to: "/dashboard/about" },
    { label: "Add Books", to: "/dashboard/add" },
    { label: "Issue Books", to: "/dashboard/issue" },
    { label: "List Books", to: "/dashboard/list" },
    { label: "Contact", to: "/dashboard/contact" },
];

export default function SideNav() {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const closeOnOutsideClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isOpen]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <aside className="side-nav" ref={navRef} aria-label="Dashboard navigation">
            <button
                type="button"
                className="side-nav-toggle"
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                aria-controls="dashboard-navigation-links"
                onClick={() => setIsOpen((open) => !open)}
            >
                <span className="hamburger-lines" aria-hidden="true" />
            </button>
            <div className={`side-nav-menu${isOpen ? " is-open" : ""}`}>
                <div className="side-nav-menu-inner" id="dashboard-navigation-links">
                    <p className="side-nav-heading">Workspace</p>
                    <nav className="side-nav-links">
                        {navigationLinks.map(({ label, to, end }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={end}
                                className={({ isActive }) => `side-nav-link${isActive ? " active" : ""}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {label}
                            </NavLink>
                        ))}
                        <button type="button" className="side-nav-logout" onClick={handleLogout}>
                            Log out
                        </button>
                    </nav>
                </div>
            </div>
        </aside>
    );
}