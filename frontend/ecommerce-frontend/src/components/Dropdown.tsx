import React from 'react'
import { useState } from 'react'

interface DropdownProps {
    DropdownContent: React.ComponentType;
    children: string;
    href: string;
  }

  const Dropdown: React.FC<DropdownProps> = ({DropdownContent, children, href}) => {
    const [open, setOpen] = useState(false);
    const showContent = open && DropdownContent; 

    return (
        <div 
        onMouseEnter={()=>setOpen(true)} 
        onMouseLeave={()=>setOpen(false)} 
        className='relative h-fit w-fit text-white my-5'
        >   
            <a href={href} className="flex text-black">
                {children}
                <div className='relative ml-2 border-l-8 border-r-8 border-r-transparent border-l-transparent border-t-[14px] top-[6px] border-t-black'></div>
                <div className='absolute top-5 left-0 right-0 h-6 bg-transparent'/>
            </a>
            <span 
            style={{
                transform: showContent ? "ScaleX(1)": "ScaleX(0)"
            }}
            className='absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-red-500 transition-transform duration-300 ease-out'></span>
            {showContent && (
                <div className='fixed top-28 left-1/2 text-black shadow-2xl -translate-x-1/2 bg-white w-[75%] h-[55%]'>
                    <DropdownContent/>
                </div>
            )}
        </div>
        
    );
  };
  
  export default Dropdown;