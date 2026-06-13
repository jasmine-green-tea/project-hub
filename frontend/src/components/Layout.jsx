import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CreateProjectModal from "./CreateProjectModal";

export default function Layout({
    user,
    onLogout,
    children,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal
}) {
    const location = useLocation();
    const navigate = useNavigate();
    const hideNavbar = ["/login", "/register"].includes(location.pathname);

    const handleProjectCreated = (projectId) => {
        closeCreateModal();
        //navigate(`/projects/${projectId}`);
        navigate(`/dashboard`);
    };

    return (
        <>
            {!hideNavbar && (
                <Navbar
                    user={user}
                    onLogout={onLogout}
                    onCreateProject={openCreateModal}
                />
            )}
            {children}
            <CreateProjectModal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                onProjectCreated={handleProjectCreated}
            />
        </>
    );
};