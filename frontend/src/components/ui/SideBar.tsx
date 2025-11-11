import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, LogOut, Menu, X, Text, LinkIcon, Brain } from "lucide-react";
import { LogoIcon } from "../../assets/icons/LogoIcon";
import { useNavigate } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";

export const SideBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userInitial, setUserInitial] = useState("U");

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); 
    if (storedUser && storedUser.length > 0) {
      setUserInitial(storedUser.trim()[0].toUpperCase());
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: any = JSON.parse(atob(token.split(".")[1]));
          if (decoded?.name) setUserInitial(decoded.name[0].toUpperCase());
        } catch {
          setUserInitial("U");
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {/* Mobile Header Bar (Logo + Menu) */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-white border-b border-gray-200 p-3 md:hidden">
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
          <LogoIcon size="lg" /> Second Brain
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md bg-white shadow-sm border border-gray-200 hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Backdrop for mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)} // close when clicking outside
            />
            <motion.div
              key="sidebar"
              initial={{ x: -250, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -250, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="fixed top-0 left-0 z-50 w-64 bg-white h-screen flex flex-col justify-between border-r border-gray-200 p-4 md:hidden shadow-xl"
            >
              {/* Sidebar Header (Logo + Close Button) */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-xl font-semibold flex items-center gap-2 text-blue-600" onClick={()=>navigate('/')}>
                  <LogoIcon size="lg" /> Second Brain
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1">
                <ul className="space-y-4 text-gray-700 font-medium">
                  <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer" onClick={()=>navigate('/x')}>
                    <FaXTwitter size={18} /> Tweets
                  </li>
                  <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer" onClick={()=>navigate('/youtube')}>
                    <Youtube size={18} /> YouTube
                  </li>
                  <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer" onClick={()=>navigate('/text')}>
                    <Text size={18} /> Text
                  </li>
                  <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer" onClick={()=>navigate('/links')}>
                    <LinkIcon size={18} /> Other Links
                  </li>
                </ul>
              </div>

              {/* Footer Section */}
              <div className="flex flex-col gap-3 mt-8 border-t pt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                    {userInitial}
                  </div>
                  <span className="font-semibold">Profile</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-all mt-2"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="hidden md:flex md:flex-col md:justify-between md:w-64 md:h-screen md:bg-white md:border-r md:border-gray-200 md:p-4"
      >
        <div>
          <div className="text-xl font-semibold mb-8 flex items-center gap-2 text-blue-600 cursor-pointer" onClick={()=>navigate('/')}>
            <LogoIcon size="lg" /> Second Brain
          </div>

          <ul className="space-y-4 text-gray-700 font-medium">
            <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}>
              <Brain size={18}/> Your Brain
            </li>
            <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/x")}>
              <FaXTwitter size={18} /> X
            </li>
            <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/youtube")}>
              <Youtube size={18} /> YouTube
            </li>
            <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/text")}>
              <Text size={18} /> Text
            </li>
            <li className="flex items-center gap-3 hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/links")}>
              <LinkIcon size={18} /> Other Links
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 mt-8 border-t pt-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
              {userInitial}
            </div>
            <span className="font-semibold">Profile</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-all mt-2"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </motion.div>
    </>
  );
};
