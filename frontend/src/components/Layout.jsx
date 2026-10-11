import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav";

export default function Layout() {
    return (
        <div className="dashboard-shell">
            <Header />
            <div className="dashboard-body">
                <SideNav />
                <main className="dashboard-main">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}