import React from 'react';
import Sidebar from './SideBar/Sidebar';
import BottomBar from './SideBar/BottomBar';

function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* //bar for desktop and mobile */}
      <div className="hidden md:block">
        <Sidebar /> 
      </div>
      <div className="block md:hidden">
        <BottomBar />  
      </div>

      {/* //Content */}

    </div>
  );
}

export default Home;
