import { motion } from "framer-motion";
import { Button } from "./Button";
import { useSetRecoilState } from "recoil";
import { modalwindowRecoil } from "../../store/atom";
import { BACKEND_URL } from "../../config";
import axios from 'axios'

export const MainContent = () => {
  const setModalWindow = useSetRecoilState(modalwindowRecoil);

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
      alert(`http://localhost:5173/share?hash=${res.data.hash}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-8 bg-[#f7faff] min-h-screen"
    >
      <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
        <h1 className="text-2xl font-semibold text-gray-800">All Notes</h1>

        <div className="flex gap-3">
          <Button variant="secondary" text="Share Brain" size="md" onClick={shareBrainHandler}/>
          <Button
            variant="primary"
            text="Add Content"
            size="md"
            onClick={() => setModalWindow(true)}
          />
        </div>
      </div>

      <div className="text-gray-500 text-center mt-20">
        Your saved content will appear here 👇
      </div>
    </motion.div>
  );
};
