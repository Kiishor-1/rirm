import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../slices/authSlice";
import toast from "react-hot-toast";
import { FiMenu, FiX } from "react-icons/fi";
import Modal from "./Modal";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success('User logged out');
    navigate("/");
    setIsModalOpen(false); 
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <nav className={`relative flex lg:flex-row flex-col lg:items-center justify-between md:px-16 px-4 py-4 bg-gray-900 overflow-hidden`}>
      <div className="z-10">
        <Link to={"/"} className="text-white text-2xl font-semibold">Rirm</Link>
      </div>

      <div className="lg:hidden z-20 absolute right-2">
        <button onClick={toggleMenu} className="text-white">
          {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
      </div>

      <div className={`relative z-[2] lg:block lg:py-0 py-6 ${menuOpen ? "block" : "hidden"}`}>
        {user ? (
          <div className="flex flex-col lg:flex-row lg:items-center items-start gap-4 text-white">
            <button onClick={openModal} className="px-4 py-[0.4rem]">Logout</button>
            <button className="px-4 flex items-center gap-3">
              Hello! {user?.name.split(" ")[0]}
              <img
                className="rounded-full w-[3rem]"
                src={`https://ui-avatars.com/api/?name=${user?.email}`}
                alt="Profile Image"
                title={`${user?.email}`}
              />
            </button>
          </div>
        ) : (
          <div className="flex items-center md:flex-row gap-3">
            <Link to={"/login"} className="w-[5.5rem] text-center border border-2 border-white text-white px-4 py-[0.4rem] rounded-md">Login</Link>
            <Link to={"/register"} className="w-[5.5rem] text-center bg-white text-red-400 px-4 py-2 rounded-md">Register</Link>
          </div>
        )}
      </div>

      {/* Modal for logout confirmation */}
      <Modal isOpen={isModalOpen}>
        <div className="flex flex-col items-center py-4">
          <h2 className="text-xl mb-4">Are you sure you want to logout?</h2>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Yes, Logout
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </nav>
  );
}
