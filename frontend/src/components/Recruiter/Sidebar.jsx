import { FaSuitcase, FaUsers, FaCog } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { useState } from 'react';
import Modal from '../Modal';

export default function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        setLogoutModalOpen(false);
    };

    const handleOpenLogoutModal = () => {
        setLogoutModalOpen(true);
    };

    const handleCloseLogoutModal = () => {
        setLogoutModalOpen(false);
    };

    return (
        <div className="bg-gray-900 text-white h-screen w-64 flex flex-col p-4">
            <div className="text-2xl font-bold mb-6 uppercase">Rirm</div>
            <nav className="flex-1 space-y-4">
                <SidebarLink to="/dashboard" icon={<FaSuitcase />} label="Jobs" />
                <SidebarLink to="/dashboard/applications" icon={<FaUsers />} label="Applications" />
                <SidebarLink to="/dashboard/new" icon={<BsPlusCircle />} label="Post" />
            </nav>
            <div className="mt-auto">
                <div
                    className="flex items-center space-x-4 p-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-700"
                    onClick={handleOpenLogoutModal}
                >
                    <span className="text-lg"><FiLogOut /></span>
                    <span>Logout</span>
                </div>
            </div>

           {isLogoutModalOpen && <Modal isOpen={isLogoutModalOpen}>
                <div className="text-center py-4">
                    <h3 className="text-lg text-gray-700 font-semibold mb-4">Are you sure you want to log out?</h3>
                    <div className="flex justify-center gap-4">
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            onClick={handleLogout}
                        >
                            Yes, Logout
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                            onClick={handleCloseLogoutModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>}
        </div>
    );
}

const SidebarLink = ({ to, icon, label }) => (
    <Link
        to={to}
        className="flex items-center space-x-4 p-2 rounded-lg transition-colors hover:bg-gray-700"
    >
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
    </Link>
);
