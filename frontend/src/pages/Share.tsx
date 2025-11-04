import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import type { cardProps } from "../components/ui/Card";
import { Card } from "../components/ui/Card";
import axios from "axios";
import { SideBar } from "../components/ui/SideBar";
import { motion } from "framer-motion";

interface ContentsResponse {
  content: cardProps[];
}

export const Share = () => {
  const [searchParams] = useSearchParams();
  const hash = searchParams.get("hash");

  const [contents, setContents] = useState<cardProps[]>([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        if (res.data.content && res.data.content.length > 0) {
          setContents(res.data.content);
          setUsername(res.data.content[0].userId?.username || "Unknown");
        } else {
          setError("No shared content found.");
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

  return (
    <div className="min-h-screen w-screen flex bg-[#f7faff] overflow-hidden">
      <SideBar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-6 md:p-8 pt-[56px] md:pt-8"
      >
        {/* Header */}
        <div className="font-semibold text-3xl text-gray-800 mb-6">
          {loading
            ? "Loading Shared Brain..."
            : error
            ? "Error Loading Brain"
            : `Shared Brain of ${username}`}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-md p-4 mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="text-gray-500 text-center mt-20">
            Fetching shared brain data...
          </div>
        )}

        {/* Content Cards */}
        {!loading && !error && contents.length > 0 && (
          <div className="p-2 pt-6 flex flex-wrap gap-4 justify-start">
            {contents.map((content) => (
              <Card
                key={content._id}
                title={content.title}
                type={content.type}
                link={content.link}
                _id={content._id}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && contents.length === 0 && (
          <div className="text-gray-500 text-center mt-20">
            No content available in this shared brain yet.
          </div>
        )}
      </motion.div>
    </div>
  );
};
