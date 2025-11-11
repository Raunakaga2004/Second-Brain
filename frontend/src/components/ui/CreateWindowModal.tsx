import { useRef, useEffect } from "react";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useSetRecoilState } from "recoil";
import { modalwindowRecoil } from "../../store/atom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export const CreateWindowModal = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const setModalWindow = useSetRecoilState(modalwindowRecoil);

  const submitHandler = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const linkValue = linkRef.current?.value?.toLowerCase() || "";
    
    const linkType = () => {
      const link = linkValue.trim();

      if (!link) return "text";

      if (link.includes("youtube.com")) return "youtube";
      if (link.includes("x.com")) return "x";

      try {
        new URL(link);
        return "link";
      } catch {
        return "text";
      }
    };

    const type = linkType();

    try {
      await axios.post(
        `${BACKEND_URL}/content`,
        {
          title: titleRef.current?.value,
          link: linkRef.current?.value || "",
          description: descRef.current?.value || "",
          type: type,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(`${type} added successfully!`)
      setModalWindow(false);
    } catch (err) {
      console.error("Error adding content:", err);
      alert("Failed to add content.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalWindow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setModalWindow]);

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
        {/* Close button */}
        <button
          onClick={() => setModalWindow(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Close modal"
        >
          <CloseIcon size="md" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
          Add New Content
        </h2>

        {/* Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <Input placeholder="Title" reference={titleRef} />
          <Input placeholder="Link (optional)" reference={linkRef} />

          <textarea
            ref={descRef}
            placeholder="Description (optional)"
            className="border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          ></textarea>

          <Button variant="primary" text="Submit" size="md" type="submit" />
        </form>
      </motion.div>
    </div>
  );
};
