import { useRef, useEffect } from "react";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRecoilState, useSetRecoilState } from "recoil";
import { editModalRecoil, reloadRecoil } from "../../store/atom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { motion } from "framer-motion";

export const EditWindowModal = () => {
  const [editModal, setEditModal] = useRecoilState(editModalRecoil);
  const setReload = useSetRecoilState(reloadRecoil);

  // 🧠 Refs for form inputs
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const content = editModal?.contentData;

  /** ✅ Fill existing values into refs when modal opens */
  useEffect(() => {
    if (content && editModal.isOpen) {
      if (titleRef.current) titleRef.current.value = content.title || "";
      if (linkRef.current) linkRef.current.value = content.link || "";
      if (descRef.current) descRef.current.value = content.description || "";
    }
  }, [content, editModal.isOpen]);

  /** ✅ Form submission */
  const submitHandler = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!content) return;

    const title = titleRef.current?.value?.trim();
    const link = linkRef.current?.value?.trim();
    const description = descRef.current?.value?.trim();

    const linkType =
      link?.includes("youtube.com")
        ? "youtube"
        : link?.includes("x.com")
        ? "x"
        : "text";

    try {
      await axios.put(
        `${BACKEND_URL}/content/${content._id}`,
        { title, link, description, type: linkType },
        { headers: { Authorization: `${localStorage.getItem("token")}` } }
      );

      alert("Content updated!");
      setReload(Date.now());
      setEditModal({ isOpen: false });
    } catch (err) {
      console.error("Error updating content:", err);
      alert("Failed to update content.");
    }
  };

  /** ✅ Click outside to close */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setEditModal({ isOpen: false });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setEditModal]);

  // 🧠 Only render modal when open
  if (!editModal.isOpen || !content) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm">
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 w-[90%] max-w-sm relative"
      >
        {/* ❌ Close button */}
        <button
          onClick={() => setEditModal({ isOpen: false })}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Close modal"
        >
          <CloseIcon size="md" />
        </button>

        {/* 🧠 Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
          Edit Content
        </h2>

        {/* ✏️ Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <Input placeholder="Title" reference={titleRef} />
          <Input placeholder="Link" reference={linkRef} />
          <textarea
            ref={descRef}
            placeholder="Description (optional)"
            className="border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          ></textarea>

          <Button variant="primary" text="Update" size="md" type="submit" />
        </form>
      </motion.div>
    </div>
  );
};
