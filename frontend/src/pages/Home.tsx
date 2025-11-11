import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { modalwindowRecoil } from "../store/atom";
import { CreateWindowModal } from "../components/ui/CreateWindowModal";
import { SideBar } from "../components/ui/SideBar";
import { MainContent } from "../components/ui/MainContent";
import { LandingPage } from "../components/ui/LandingPage";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";

interface DecodedToken {
  id: string;
  exp: number;
}

const Home = () => {
  const windowModalOpen = useRecoilValue(modalwindowRecoil);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) setIsAuthenticated(true);
        else localStorage.removeItem("token");
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  if (!isAuthenticated) return <LandingPage />;

  return (
  <div className="h-screen w-screen flex flex-col bg-[#f7faff] dark:bg-[#0d1117] overflow-hidden">
  {/* Main body */}
  <div className="flex-1 flex pt-[56px] md:pt-0 overflow-hidden">
    <SideBar />
    <div className="flex-1 overflow-y-auto">
      <MainContent />
    </div>
  </div>

    {/* Modal */}
    <AnimatePresence>
      {windowModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
        >
          <CreateWindowModal />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

};

export default Home;
