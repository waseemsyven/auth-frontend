"use client";
import React from "react";
import Datasetlist from "../../components/DatasetTable";
import Sidebar from "../../components/Sidebar";

function page() {
  return (
    <div>
      <Sidebar>
        <Datasetlist />
      </Sidebar>
    </div>
  );
}

export default page;
