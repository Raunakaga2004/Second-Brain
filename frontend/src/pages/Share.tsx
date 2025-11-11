import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import type { cardProps } from "../components/ui/Card";
import { Card } from "../components/ui/Card";
import axios from "axios";
import { SideBar } from "../components/ui/SideBar";
import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { LandingPage } from "../components/ui/LandingPage";

interface ContentsResponse {
  user: {
    _id: string;
    name: string;
  };
  content: cardProps[];
}

interface DecodedToken {
  id: string;
  exp: number;
}

export const Share = () => {
  const [searchParams] = useSearchParams();
  const hash = searchParams.get("hash");

  const [contents, setContents] = useState<cardProps[]>([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    let authenticated = false;

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          authenticated = true;
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }

    if (!authenticated) {
      navigate("/signin");
    }
  }, [navigate]);

  // Fetch shared brain content
  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const res = await axios.get<ContentsResponse>(
          `${BACKEND_URL}/brain/${hash}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        setUsername(res.data.user.name);

        if (res.data.content) {
          setContents(res.data.content);
        }
      } catch (err) {
        console.error("Error fetching shared brain:", err);
        setError("Something went wrong while loading this shared brain.");
      } finally {
        setLoading(false);
      }
    }

    if (hash) fetch();
  }, [hash]);

  if (!isAuthenticated) return <LandingPage />;

  return (
    <div className="h-screen w-screen flex flex-col bg-[#f7faff] overflow-hidden">
      {/* Main body */}
      <div className="flex-1 flex pt-[56px] md:pt-0 overflow-hidden">
        <SideBar />

        {/* Animated main section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="flex-1 overflow-y-auto p-6 md:p-8"
        >
          {/* Header */}
          <div className="mb-6">
            {loading ? (
              <h1 className="text-xl font-semibold text-gray-800">
                Loading Shared Brain...
              </h1>
            ) : error ? (
              <h1 className="text-xl font-semibold text-red-600">
                Error Loading Brain
              </h1>
            ) : (
              <h1 className="text-xl font-semibold text-gray-800">
                Shared Brain of{" "}
                <span className="text-blue-600 text-2xl font-semibold">
                  {username}
                </span>
              </h1>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 text-red-700 border border-red-200 rounded-md p-4 mb-6"
            >
              {error}
            </motion.div>
          )}

          {/* Loading State */}
          {loading && !error && (
            <div className="text-gray-500 text-center mt-20">
              Fetching shared brain data...
            </div>
          )}

          {/* Content Cards */}
          {!loading && !error && contents.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-2 pt-6 flex flex-wrap gap-4 justify-start"
            >
              {contents.map((content) => (
                <Card
                  key={content._id}
                  title={content.title}
                  type={content.type}
                  link={content.link}
                  _id={content._id}
                />
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && !error && contents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center mt-20"
            >
              No content available in this shared brain yet.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Share;
