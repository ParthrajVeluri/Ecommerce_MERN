import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import SidebarContent from "../components/SidebarContent";
import { RxHamburgerMenu } from "react-icons/rx";

const Home: React.FC = () => {
    const [SidebarToggle, setSidebarToggle] = useState(true);

    const handleSidebar = () => {
        setSidebarToggle(!SidebarToggle);
    }

    return (
        <div className="flex-col">
            <div className="duration-300">
                <Sidebar SidebarComponent={SidebarContent} SidebarToggle={SidebarToggle} handleSidebar={handleSidebar} />
            </div>
            <div className={`flex flex-col w-full`}>
                <NavBar SidebarToggle={SidebarToggle} handleSidebar={handleSidebar} />
                <button className={`sticky py-2 top-0 text-black flex justify-center gap-2 text-md sm:hidden w-full bg-emerald-600 hover:bg-emerald-600 ${SidebarToggle ? "sticky" : "hidden"}`} onClick={handleSidebar}>
                    <p className="relative top-[2px]">Menu</p>
                    {<RxHamburgerMenu size="35" className="z-20"/>}
                </button>
                <div className="flex flex-col lg:mx-60 md:mx-44">
                    
                    <div className="flex flex-row flex-wrap h-screen shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full">
                        <div className="mt-4 rounded-lg w-96 h-72 bg-gray-200 mx-4"></div>
                        <div className="mt-4 rounded-lg w-96 h-72 bg-gray-200 mx-4"></div>
                        <div className="mt-4 rounded-lg w-96 h-72 bg-gray-200 mx-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
