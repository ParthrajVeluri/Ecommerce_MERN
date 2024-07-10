import Icon from "react-icons-kit"
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import nexusLogo from "../images/nexus-logo.png";
import { useState } from "react";
import Dropdown from "./Dropdown"
import DropdownContent1 from "./DropdownContent1"
import DropdownContent2 from "./DropdownContent2";
import Sidebar from "./Sidebar"
import { RxHamburgerMenu } from "react-icons/rx";


interface NavBarProps {
    SidebarToggle: boolean;
    handleSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ SidebarToggle, handleSidebar }) =>{
    const [itemCount, setItemCount] = useState(0);
    const [account, setAccount] = useState(true);

    return (

    <div className="top-0 bg-gray-100 w-full h-fit">
        
        <div className="sm:h-12 h-8 mx-2 lg:mr-16 my-3 lg:gap-10 md:gap-3 md:mx-8 sm:mx-2 ml-auto sm:gap-5 flex items-center sm:justify-between">
            <button className="h-10 p-2 rounded-full w-28   sm:flex">
                <img src={nexusLogo} alt="logo" className="min-h-8 min-w-28" />
            </button>
            {/*Searchbar*/}
            <div className={`hidden sm:flex bg-white rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] sm:ml-5 ${SidebarToggle ? "flex" : "hidden"}`}>
                <input className=" bg-transparent rounded-l-full pl-2 lg:text-xl md:text-lg sm:text-sm sm:w-48 md:w-64 lg:min-w-96 lg:w-128 outline-none" 
                placeholder="Search Nexus"/>
                <button className="flex py-2 px-1 lg:px-8 md:px-4 sm:px-2 rounded-r-md bg-blue-500 border-blue-500 hover:bg-blue-800 border"
                >
                   <FaSearch className="relative rounded-lg sm:text-xl lg:text-2xl xl:text-3xl" size={""}/>
                </button>
            </div>
            {/*Register/Account*/}
            <button className="flex-row mx-1 lg:flex flex-nowrap text-center rounded-full w-fit hover:bg-emerald-600 hidden">
                <MdAccountCircle className="relative ml-2 top-[6px]" size="40"/>
                <p className="relative min-w-6 ml-2 text-black text-sm leading-tight text-left h-10 break-words pr-6 pt-[4px]">{account ? (
                <>
                    Hello<br/>Accountname
                </>
            ) : (
                <>
                    Register<br/>Account
                </>
            )}</p>
            </button>
            {/*Shopping cart icon*/}
            <button className={`relative sm:block ml-auto rounded-full px-2 lg:px-6 sm:px-2 h-8 sm:h-12 hover:bg-emerald-600 z-1 mx-1 ${SidebarToggle ? "block" : "hidden"}`} >
                <div className="border-2 border-black text-black inline-flex bg-white justify-center items-center rounded-50% text-sm sm:text-lg p-2 text-center w-4 h-4 sm:h-6 sm:w-6 sm:right-4 relative bottom-[2px] left-[6px] z-[1]">
                    {itemCount}
                </div>
                <div>
                    <FaShoppingCart color="black" className="relative bottom-4 right-1 text-xl sm:text-xl lg:text-2xl xl:text-3xl" size={""}/>
                </div>
            </button>
        </div>
        {/* Mobile view */}
        
        <div className={`sm:hidden my-2 bg-white rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] w-full ${SidebarToggle ? "flex" : "hidden"}`}>
            <input className="z-20 bg-transparent rounded-l-full pl-2 w-full outline-none" 
            placeholder="Search Nexus"/>
            <button className="z-20 py-2 px-1 rounded-r-md bg-blue-500 border-blue-500 hover:bg-blue-800 border">
                <FaSearch className=" rounded-lg text-sm" size={""}/>
            </button>
        </div>
        <div className="sm:flex hidden">
            <div className="h-10 bg-gray-100 m-auto text-center sm:flex items-center justify-center text-sm lg:gap-16 md:gap-8 sm:gap-2 gap-0 " onClick={handleSidebar}>
                <button className="text-black flex items-center justify-center gap-[8px] h-fit w-fit p-1 ">
                    All {<RxHamburgerMenu size="25" className={`top-[30px] left-[30px]`}/>}
                </button>
                <Dropdown DropdownContent={DropdownContent1} href={"#"} children="Categories"></Dropdown>
                <Dropdown DropdownContent={DropdownContent2} href={"#"} children="Dropdown 2"></Dropdown>
                <Dropdown DropdownContent={DropdownContent1} href={"#"} children="Dropdown 3"></Dropdown>
                <Dropdown DropdownContent={DropdownContent1} href={"#"} children="Dropdown 4"></Dropdown>
            </div>
        </div>
        
    </div>
    );
}

export default NavBar;