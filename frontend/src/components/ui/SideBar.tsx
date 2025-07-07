import { LinkIcon } from "../../assets/icons/LinkIcon"
import { LogoIcon } from "../../assets/icons/LogoIcon"
import { TagIcon } from "../../assets/icons/TagIcon"
import { TwitterIcon } from "../../assets/icons/TwitterIcon"
import { YoutubeIcon } from "../../assets/icons/YoutubeIcon"

export const SideBar = ()=>{
    return <div className="fixed w-72 border-r-1 h-screen border-slate-200 pt-4 pl-4 bg-white">
        <div className="flex items-center gap-2 font-semibold text-xl">
            <LogoIcon size="lg"/>
            Second Brain
        </div>
        <div className="pl-4 pt-8 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <TwitterIcon size="sm"/>
                Tweets
            </div>
            <div className="flex items-center gap-2">
                <YoutubeIcon size="sm"/>
                Youtube Videos
            </div>
            <div className="flex items-center gap-2">
                <LinkIcon size="sm"/>
                Links
            </div>
            <div className="flex items-center gap-2">
                <TagIcon size="sm"/>
                Tags
            </div>
        </div>
    </div>
}