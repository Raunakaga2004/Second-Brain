import { motion } from "framer-motion";
import { Button } from "./Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalwindowRecoil, reloadRecoil } from "../../store/atom";
import { BACKEND_URL } from "../../config";
import axios from 'axios'
import { Card, type cardProps } from "./Card";
import { useEffect, useState } from "react";
import { Copy, Plus, Share2Icon } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const MainContent = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState<cardProps[]>([]);
  const [modalWindow, setModalWindow] = useRecoilState(modalwindowRecoil);

  const reloadRecoilVal = useRecoilValue(reloadRecoil);

  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUserName(storedUser || "User") 
  }, [])

  useEffect(()=>{
      async function fetch(){
          await axios.get<cardProps[]>(`${BACKEND_URL}/content`, {
              headers : {
                  Authorization : localStorage.getItem('token')
              }
          }).then((res)=>{
              //@ts-ignore
              setContents(res.data.content);
          }).catch((e)=>{
              console.log(e);
          })
      }

      fetch();
  }, [modalWindow, reloadRecoilVal])

  interface responseType  {
    hash : String
  }

  const shareBrainHandler = async () => {
      const res = await axios.post<responseType>(`${BACKEND_URL}/brain/share`,{
          share : true
      }, {
          headers : {
              Authorization : localStorage.getItem('token')
          }
      })
      
      console.log(res);

      // const shareLink = `http://localhost:5173/share?hash=${res.data.hash}`;
      // navigator.clipboard.writeText(shareLink);
      // toast.success("Share link copied to clipboard!");

      // const shareLink = `http://localhost:5173/share?hash=${res.data.hash}`;
      const shareLink = `https://secondbrain.raunakagarwal.me/share?hash=${res.data.hash}`;

      toast(
        <div className="flex flex-col items-center justify-between gap-3">
          {/* Link */}
          <div onClick={()=>
            navigate(`/share?hash=${res.data.hash}`)
          } className="cursor-pointer"> Click to share this Brain </div>

          {/* Copy Icon Button */}
          {/* <Copy
            size={18}
            className="text-gray-600 hover:text-blue-600 cursor-pointer transition"
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              toast.success("Link copied to clipboard!", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
              });
            }}
          /> */}
        </div>,
        {
          position: "bottom-center",
          autoClose: 5000,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light", // no colored toast
          style: {
            background: "#fff",
            border: "1px solid #e5e7eb",
            color: "#111",
            borderRadius: "10px",
            padding: "10px 14px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          },
        }
      );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-8 bg-[#f7faff] min-h-screen overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
        <h1 className="text-xl font-semibold text-gray-800"><span className="text-blue-600 text-2xl">{userName}'s</span> Brain</h1>

        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            text="Share Brain" 
            size="md" 
            onClick={shareBrainHandler}
            startIcon={<Share2Icon size={18}/>}
          />
          <Button
            variant="primary"
            text="Add Content"
            size="md"
            onClick={() => setModalWindow(true)}
            startIcon={<Plus size={18}/>}
          />
        </div>
      </div>

      <div className="mt-10 px-2 sm:px-4 md:px-8 text-gray-700">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {contents?.map((content) => (
            <div key={content._id} className="break-inside-avoid">
              <Card
                title={content.title}
                type={content.type}
                link={content.link}
                _id={content._id}
                description={content.description}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
