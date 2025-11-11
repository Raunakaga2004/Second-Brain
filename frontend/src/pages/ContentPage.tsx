import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SideBar } from "../components/ui/SideBar";
import { BACKEND_URL } from "../config";
import { Card, type cardProps } from "../components/ui/Card";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { LandingPage } from "../components/ui/LandingPage";

interface DecodedToken {
  id: string;
  exp: number;
}

export const ContentPage = () => {
  const { type } = useParams<{ type: string }>();
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<{ content?: cardProps[] }>(`${BACKEND_URL}/content`, {
          headers: { Authorization: localStorage.getItem("token") },
        });

        const allData = Array.isArray(res.data)
          ? res.data
          : res.data?.content || [];

        const filtered = type
          ? allData.filter((item) => item.type === type)
          : allData;

        setContent(filtered);
      } catch (err) {
        console.error("Failed to fetch content:", err);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchData();
  }, [type, isAuthenticated]);

  if (!isAuthenticated) return <LandingPage />;

  return (
    <div className="h-screen w-screen flex flex-col bg-[#f7faff] overflow-hidden dark:bg-[#0d1117]">
      {/* Main body */}
      <div className="flex-1 flex pt-[56px] md:pt-0 overflow-hidden">
        <SideBar />

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto p-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-semibold mb-6 text-gray-800 capitalize"
          >
            {type === "x"
              ? "Tweets"
              : type === "youtube"
              ? "YouTube"
              : type === "text"
              ? "Text"
              : "Other Links"}
          </motion.h1>

          {loading ? (
            <div className="flex justify-center items-center h-[70vh] text-gray-500">
              Loading {type}...
            </div>
          ) : content.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No content found for {type}.
            </p>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {content.map((item) => (
                <Card key={item._id} {...item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
