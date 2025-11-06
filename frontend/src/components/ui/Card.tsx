import { useSetRecoilState } from "recoil";
import { DeleteIcon } from "../../assets/icons/DeleteIcon"
import {ShareIcon} from "../../assets/icons/ShareIcon"
import { TwitterIcon } from "../../assets/icons/TwitterIcon";
import { YoutubeIcon } from "../../assets/icons/YoutubeIcon"
import { BACKEND_URL } from "../../config";
import { Button } from "./Button"

import axios from "axios";
import { reloadRecoil } from "../../store/atom";
import { useEffect } from "react";

// const demotags = ["productivity", "sports", "car"]

export interface cardProps {
    title : string;
    type : "youtube" | "x";
    link : string;
    tags? : string[];
    _id : string;
    userId? : {
        _id : string;
        name : string;
    }
}

export const Card = (props: cardProps) => {
  const setReloadRecoil = useSetRecoilState(reloadRecoil);

  const deleteHandler = async () => {
    await axios.delete(`${BACKEND_URL}/content`, {
      params: { id: props._id },
      headers: { Authorization: localStorage.getItem("token") },
    });
    setReloadRecoil(Date.now());
  };

  // 👇 Add this useEffect to load the Twitter embed script
  useEffect(() => {
    if (props.type === "x") {
      const script = document.createElement("script");
      script.setAttribute("src", "https://platform.twitter.com/widgets.js");
      script.setAttribute("async", "true");
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [props.type, props.link]);

  return (
    <div className="min-h-72 h-full max-w-72 border border-slate-200 border-2 rounded-lg p-4 bg-white min-w-64">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {props.type === "youtube" && <YoutubeIcon size="md" />}
          {props.type === "x" && <TwitterIcon size="md" />}

          <div className="text-sm">{props.title}</div>
        </div>
        <div className="flex gap-2 items-center text-slate-600">
          <button>
            <ShareIcon size="sm" />
          </button>
          <button onClick={deleteHandler}>
            <DeleteIcon size="sm" />
          </button>
        </div>
      </div>

      <div className="w-full py-4">
        {props.type === "youtube" && (
          <iframe
            src={`${props.link
              .replace("watch?v=", "embed/")
              .split("&")[0]};controls=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        )}

        {props.type === "x" && (
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {props.tags?.map((tag) => (
          <Button key={tag} text={`#${tag}`} size="sm" variant="secondary" />
        ))}
      </div>
    </div>
  );
};