import { useRecoilValue } from "recoil";
import { modalwindowRecoil } from "../store/atom";
import { CreateWindowModal } from "../components/ui/CreateWindowModal";
import { SideBar } from "../components/ui/SideBar";
import { MainContent } from "../components/ui/MainContent";

export const Home = () => {
    const windowModalOpen = useRecoilValue(modalwindowRecoil);
    
    return <div className='h-screen w-screen'>
        {windowModalOpen && <CreateWindowModal/>}
        <SideBar/>
        <MainContent/>
    </div>
}