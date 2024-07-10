import React from 'react';
import { MdAccountCircle } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaGear } from "react-icons/fa6";
import nexusLogo from "../images/nexus-logo.png";

interface SidebarContentProps{
  SidebarToggle : boolean;
  handleSidebar: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({handleSidebar}) => {

  return (
    <div className='flex flex-col text-white'>
        <div className='flex h-[100px] w-full justify-center rounded-b-sm text-white items-center z-0 m-0 p-0'>
            <div className='flex justify-center gap-5'>
              <img src={nexusLogo} alt="logo" className=" h-10" />
              <RxHamburgerMenu className='relative right-1' size="35" onClick={handleSidebar}/>    
            </div>
        </div>
        
        <span>
          <hr className='flex relative top-2 bottom-2 m-auto w-[95%] h-[2px] bg-gray-500 rounded-full border-none'></hr>
        </span>

        <div id='Box1' className='py-2'>
          <button className='flex relative top-3 px-auto py-[2px] hover:bg-slate-600 w-full'>
            <FaGear className='relative mx-2' size="25"/>
            <p className='relative text-sm'>Account Settings</p>
          </button>
          <button className='flex relative top-3 px-auto py-[6px] hover:bg-slate-600 w-full'>
            <FaGear className='relative mx-2' size="25"/>
            <p className='relative text-sm'>Account Settings</p>
          </button>
        </div>

        <span>
          <hr className='flex relative top-2 bottom-2 m-auto w-[95%] h-[2px] bg-gray-500 rounded-full border-none'></hr>
        </span>

        <div id='Box2' className='py-2'>
          <button className='flex relative top-3 px-auto py-[2px] hover:bg-slate-600 w-full '>
            <FaGear className='relative mx-2' size="25"/>
            <p className='relative text-sm'>Account Settings</p>
          </button>
          <button className='flex relative top-3 px-auto py-[6px] hover:bg-slate-600 w-full rounded-md'>
            <FaGear className='relative mx-2' size="25"/>
            <p className='relative text-sm'>Account Settings</p>
          </button>
        </div>
        
    </div>
  );
}

export default SidebarContent;
