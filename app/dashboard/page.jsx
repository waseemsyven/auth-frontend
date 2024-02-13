"use client";
import React from "react";
import ModelsList from '../../components/ModelsList';
import Sidebar from '../../components/Sidebar';

function page() {

  return (
    <div>
      <Sidebar><ModelsList/></Sidebar>
     
    </div>
  );
}

export default page;
