import { useRecoilState } from "recoil";
import { previewModalRecoil } from "../../store/atom";
import { motion } from "framer-motion";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { YoutubeIcon } from "../../assets/icons/YoutubeIcon";
import { TwitterIcon } from "../../assets/icons/TwitterIcon";
import { Button } from "./Button";
import { FaXTwitter } from "react-icons/fa6";
import { Text, Youtube } from "lucide-react";

export const PreviewModal = () => {
  const [previewModal, setPreviewModal] = useRecoilState(previewModalRecoil);
  const content = previewModal.contentData;
  if (!previewModal.isOpen || !content) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-200 w-[90%] max-w-lg max-h-[90vh] relative flex flex-col"
      >
        <button
          onClick={() => setPreviewModal({ isOpen: false })}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
        >
          <CloseIcon size="md" />
        </button>

        <div className="overflow-y-auto p-6 space-y-4">
          {/* Title */}
          <div className="flex items-center gap-2 top-0 bg-white py-1 z-10">
            {content.type === "youtube" && <Youtube size={18}/>}
            {content.type === "x" && <FaXTwitter size={18}/>}
            {content.type === "text" && <Text size={18}/>}
            <h2 className="text-lg font-semibold text-gray-800">{content.title}</h2>
          </div>

          {/* Description */}
          {content.description && (
            <p
              className="text-sm text-gray-700 leading-relaxed"
              style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
            >
              {content.description}
            </p>
          )}

          {/* Media preview */}
          {content.type === "youtube" && (
            <iframe
              src={content.link?.replace("watch?v=", "embed/")}
              className="w-full aspect-video rounded-lg"
              allowFullScreen
            />
          )}

          {content.type === "x" && (
            <blockquote className="twitter-tweet">
              <a href={content.link?.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </motion.div>
    </div>
  );
};
