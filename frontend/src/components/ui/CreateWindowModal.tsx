import { useRef } from "react";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useSetRecoilState } from "recoil";
import { modalwindowRecoil } from "../../store/atom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { motion } from "framer-motion";

export const CreateWindowModal = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const setModalWindow = useSetRecoilState(modalwindowRecoil);

  const submitHandler = async () => {
    const linkValue = linkRef.current?.value?.toLowerCase() || "";
    const linkType = linkValue.includes("youtube.com")
      ? "youtube"
      : linkValue.includes("x.com")
      ? "x"
      : "";

    if (!linkType) {
      alert("Link must be from YouTube or X (Twitter).");
      return;
    }

    await axios
      .post(
        `${BACKEND_URL}/content`,
        {
          title: titleRef.current?.value,
          link: linkRef.current?.value,
          type: linkType,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setModalWindow(false);
        alert("Content added!");
      });
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 w-[90%] max-w-sm mx-auto"
    >
      <div
        className="flex justify-end text-gray-500 hover:text-red-500 cursor-pointer"
        onClick={() => setModalWindow(false)}
      >
        <CloseIcon size="md" />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Add New Content
      </h2>

      <div className="flex flex-col gap-4">
        <Input placeholder="Title" reference={titleRef} />
        <Input placeholder="Link" reference={linkRef} />

        <Button
          variant="primary"
          text="Submit"
          size="md"
          onClick={submitHandler}
        />
      </div>
    </motion.div>
  );
};
