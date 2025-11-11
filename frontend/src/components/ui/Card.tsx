import { useSetRecoilState } from "recoil";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import { TwitterIcon } from "../../assets/icons/TwitterIcon";
import { YoutubeIcon } from "../../assets/icons/YoutubeIcon";
import { BACKEND_URL } from "../../config";
import { Button } from "./Button";
import axios from "axios";
import { reloadRecoil, editModalRecoil, previewModalRecoil } from "../../store/atom";
import { useEffect, useState, type MouseEvent } from "react";
import { Edit2, Link, Text, Youtube } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { LinkPreview} from "./LinkPreview";

export interface cardProps {
  title: string;
  type: "youtube" | "x" | "text" | "link";
  link: string;
  tags?: string[];
  _id: string;
  description?: string;
  userId?: {
    _id: string;
    name: string;
  };
}

export const Card = (props: cardProps) => {
  const setReloadRecoil = useSetRecoilState(reloadRecoil);
  const setEditModal = useSetRecoilState(editModalRecoil);
  const setPreviewModal = useSetRecoilState(previewModalRecoil);
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteHandler = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    await axios.delete(`${BACKEND_URL}/content`, {
      params: { id: props._id },
      headers: { Authorization: localStorage.getItem("token") },
    });
    setReloadRecoil(Date.now());

    setShowConfirm(false);
  };

  const openPreview = () => {
    setPreviewModal({
      isOpen: true,
      contentData: {
        _id: props._id,
        title: props.title,
        link: props.link,
        description: props.description,
        type: props.type,
        tags: props.tags,
      },
    });
  };

  const editHandler = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    setEditModal({
      isOpen: true,
      contentData: {
        _id: props._id,
        title: props.title,
        link: props.link,
        description: props.description || "",
        type: props.type,
      },
    });
  };

  useEffect(() => {
    if (props.type === "x") {
      const script = document.createElement("script");
      script.setAttribute("src", "https://platform.twitter.com/widgets.js");
      script.setAttribute("async", "true");
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    }
  }, [props.type, props.link]);

  return (
    <div onClick={openPreview} className="h-full w-full max-w-80 border border-slate-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2 items-center">
          {props.type === "youtube" && <Youtube size={18}/>}
          {props.type === "x" && <FaXTwitter size={18}/>}
          {props.type === "text" && <Text size={18}/>}
          {props.type === "link" && <Link size={18}/>}
          <div className="text-sm font-semibold truncate max-w-[180px] overflow-hidden whitespace-nowrap">
            {props.title}
          </div>

        </div>

        <div className="flex gap-2 items-center">
          <button onClick={(e)=>editHandler(e)} className=" text-slate-600 hover:text-blue-600">
            <Edit2 size={18}  />
          </button>
          <button onClick={(e)=>{
            e.stopPropagation();
            setShowConfirm(true);
          }} className=" text-slate-600 hover:text-red-600">
            <DeleteIcon size="sm" />
          </button>
        </div>
      </div>

      <p
        className="text-xs truncate max-w-[240px] overflow-hidden whitespace-nowrap">
        {props.description}
      </p>

      <div className="w-full py-2">
        {props.type === "youtube" && (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={`${props.link
                .replace("watch?v=", "embed/")
                .split("&")[0]}?controls=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        )}

        {props.type === "x" && (
          <div className="flex justify-center items-center w-full overflow-hidden">
            <div className="max-w-full scale-[0.85] sm:scale-100 origin-top">
              <blockquote className="twitter-tweet" data-theme="light">
                <a href={props.link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          </div>
        )}

        {props.type === 'link' && (
          <div className="pt-2">
            <LinkPreview url={props.link} />
          </div>
        )}

        {props.type === "text" && (
          <p className="text-sm text-gray-800 mt-1 whitespace-pre-wrap break-words">
            {props.description}
          </p>
        )}
      </div>

      {/* {props.tags && props.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {props.tags.map((tag) => (
            <Button key={tag} text={`#${tag}`} size="sm" variant="secondary" />
          ))}
        </div>
      )} */}

      {showConfirm && <DeleteConfirm/>}
    </div>
  );
  function DeleteConfirm(){
  return <div
    onClick={(e) => e.stopPropagation()}
    className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[100]"
  >
    <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm border border-gray-200 text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Delete Content?</h3>
      <p className="text-sm text-gray-600 mb-5">
        Are you sure you want to delete <strong>{props.title}</strong>? This action cannot be undone.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowConfirm(false)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={(e)=>deleteHandler(e)}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
}
};

