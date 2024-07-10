import React, { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";

const DropdownContent1 = () => {
  const [selectedCatalog, setSelectedCatalog] = useState(null);

  const handleCatalog = (catalog:any) => {
    setSelectedCatalog(catalog);
  };

  return (
    <div className='flex shadow-xl h-[400px]'>
      <div className='w-[250px] bg-white p-2 overflow-y-scroll '>
        <button className='py-2 pl-2 hover:bg-slate-200 w-full text-left'>
          See all 
        </button>
        <button 
          className='flex py-2 pl-2 hover:bg-slate-200 w-full text-left'
          onMouseEnter={() => handleCatalog('Arts & Collectibles')}
        >
          Arts & Collectibles 2
          <IoIosArrowForward className='ml-auto pr-1' size="25"/>
        </button>
        <button className='py-2 pl-2 hover:bg-slate-200 w-full text-left'>
          See all 
        </button>
        <button className='py-2 pl-2 hover:bg-slate-200 w-full text-left'>
          See all 
        </button>
        <button className='py-2 pl-2 hover:bg-slate-200 w-full text-left'>
          See all 
        </button>
        <button className='py-2 pl-2 hover:bg-slate-200 w-full text-left'>
          See all 
        </button>
        <button className='py-2 pl-2 hover:bg-slate-200 w-full text-left'>
          See all 
        </button>
        <button className='py-2 pl-2 hover:bg-slate-200 w-full text-left'>
          See all 
        </button>
        <button 
          className='flex py-2 pl-2 hover:bg-slate-200 w-full text-left'
          onMouseEnter={() => handleCatalog('Video Games')}
          >
            Video Games 2
            <IoIosArrowForward className='ml-auto  pr-1' size="25"/> 
        </button>
      </div>
      <div className='w-[500px] py-2 bg-white'>
        {selectedCatalog === 'Arts & Collectibles' && (
          <div>
            <ul className='space-y-2'>
              <li>Paintings</li>
              <li>Sculptures</li>
              <li>Photography</li>
              <li>Prints</li>
              <li>Drawings</li>
            </ul>
          </div>
        )}
        {selectedCatalog === 'Video Games' && (
          <div>
            <ul>
              <li>Nintendo</li>
              <li>PC</li>
              <li>Playstation</li>
              <li>Xbox</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default DropdownContent1
