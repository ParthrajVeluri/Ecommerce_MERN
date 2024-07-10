import React from 'react';

interface SidebarContentProps {
  SidebarToggle: boolean;
  handleSidebar: () => void;
}

interface SidebarProps {
    SidebarComponent: React.ComponentType<SidebarContentProps>;
    SidebarToggle: boolean;
    handleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ SidebarComponent, SidebarToggle, handleSidebar }) => {
  
  return (
    <aside className={`flex flex-col w-[320px] fixed ${SidebarToggle ? "z-1" :"z-0"}`}>
        <div className={`px-2 top-0 left-0 h-screen bg-slate-800 shadow-2xl transform transition-transform duration-200 ${SidebarToggle ? '-translate-x-full  ease-out' : 'translate-x-0 ease-in'}`}>
            <SidebarComponent SidebarToggle={SidebarToggle} handleSidebar={handleSidebar} />
        </div>
    </aside>
  );
}

export default Sidebar;
