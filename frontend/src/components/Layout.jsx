import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout({ user, onLogout, children }) {
    const location = useLocation();
    const hideNavbar = ["/login", "/register"].includes(location.pathname);

    return (
        <>
        {!hideNavbar && <Navbar user={user} onLogout={onLogout} />}
        {children}
        </>
    );
};