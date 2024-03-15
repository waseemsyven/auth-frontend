"use client";
import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import Image from "next/image";

const fetcher = async (uri) => {
  const response = await fetch(uri);
  return response.json();
};

const columns = [
  { name: "Model Name", uid: "model_name" },
  { name: "Base Model", uid: "base_model" },
  { name: "Source", uid: "source" },
  { name: "Tier", uid: "tier" },
  { name: "Dataset Name", uid: "dataset_name" },
  { name: "Status", uid: "status" },
  { name: "Task", uid: "task" },
  { name: "More", uid: "more" },
];

export default withPageAuthRequired(
  function Models() {
    const { data } = useSWR("/api/models", fetcher);
    const [rowData, setRowData] = useState([]);
    const [openPopupRowIndex, setOpenPopupRowIndex] = useState(-1);
    const [showDeletePopup, setshowDeletePopup] = useState(-1);

    const deleteModelFunction = async (model_id) => {
      const response = await fetch(`/api/deleteModel`, {
        method: "POST",
        body: JSON.stringify({ model_id: model_id }),
      });
      const data = await response.json();
    };

    const openPopup = (index) => {
      if (openPopupRowIndex == index) {
        setOpenPopupRowIndex(-1);
        return;
      }
      setOpenPopupRowIndex(index);
    };

    useEffect(() => {
      if (data?.data) {
        setRowData(data.data);
      }
    }, [data]);

    if (data === undefined)
      return <div className="dataset-table-skeleton"></div>;

    if (data.data.error_description)
      return (
        <div className="w-full h-[500px] flex justify-center items-center border px-8">
          {data.data.error_description}
        </div>
      );

    return (
      <div className="m-6 bg-white shadow-lg rounded-[12px] grow px-4 mt-8 max-h-[800px] overflow-y-scroll">
        <h2 className="font-semibold text-md">All Models</h2>
        <table className="relative ">
          <thead>
            <tr>
              {columns.map((items, index) => (
                <th
                  className={`text-sm font-normal text-[#808080] pb-2 cursor-pointer h-[48px] ${
                    items.name == "Source"
                      ? "min-w-[100px] max-w-[100px]"
                      : items.name == "Tier"
                      ? "min-w-[100px] max-w-[100px]"
                      : items.name == "Status"
                      ? "min-w-[100px] max-w-[100px]"
                      : items.name == "Dataset Name"
                      ? "min-w-[140px] max-w-[140px]"
                      : items.name == "More"
                      ? "bg-white z-10"
                      : ""
                  }`}
                  key={index}
                >
                  <h2
                    className={`flex justify-start items-center gap-8 relative ${
                      items.name == "More" && "justify-end"
                    }`}
                  >
                    {items.name}{" "}
                  </h2>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowData.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="cursor-pointer hover:bg-[#F7FAFB] overflow-scroll"
                >
                  <td className="flex gap-2 py-2">
                    <Image
                      src="/deployed.svg"
                      alt="deployed"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                    <div>
                      {" "}
                      <h2 className="text-sm font-semibold text-[#2D2E34]">
                        {false
                          ? `${item.model_name.substring(0, 100)}...`
                          : `${item.model_name}`}
                      </h2>
                      <p className="text-xs	text-[#666] font-medium">
                        Model ID: {item.model_id.substring(0, 6)}...
                      </p>
                    </div>
                  </td>
                  <td className="text-sm font-medium text-[#2D2E34] capitalize">
                    {false
                      ? `${item.base_model.substring(0, 12)}...`
                      : `${item.base_model}`}
                  </td>
                  <td className="text-sm font-medium text-[#2D2E34] capitalize">
                    {item.source}
                  </td>
                  <td className="text-sm font-medium text-[#2D2E34] capitalize">
                    {!item.tier || item.tier === "" ? "-" : item.tier}
                  </td>
                  <td className="text-sm font-medium text-[#2D2E34] capitalize min-w-[120px]">
                    {!item.dataset_name || item.dataset_name === ""
                      ? "-"
                      : item?.dataset_name}
                  </td>
                  <td className="text-sm font-medium text-[#2D2E34] capitalize">
                    {!item.status || item.status === ""
                      ? "Available"
                      : item?.status?.toLowerCase()}
                  </td>
                  <td className="text-sm font-medium text-[#2D2E34] capitalize">
                    {item.task}
                  </td>
                  <td
                    className="text-sm font-medium text-[#2D2E34] capitalize text-right flex justify-end relative"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Image
                      src="/more_horiz_color.svg"
                      alt="more"
                      width={30}
                      height={30}
                      className="object-contain cursor-pointer"
                      // onClick={() => openPopup(index)}
                    />{" "}
                    {openPopupRowIndex === index && (
                      <div
                        className="w-20 h-10 border bg-white absolute z-[99] right-8 flex justify-center items-center top-0 rounded-lg"
                        // onClick={() => setshowDeletePopup(index)}
                      >
                        Delete
                      </div>
                    )}
                    {showDeletePopup === index && (
                      <div className="w-80 h-40 absolute right-[600px] bg-white z-[99] flex justify-center items-center rounded-lg border flex-col">
                        <h2 className="max-w-60">
                          {`Delete Model ( ${item.model_name})`}?
                        </h2>
                        <div className="w-full flex justify-between px-10 mt-10">
                          <button
                            className="bg-blue-400 px-6 py-2 rounded-lg text-white hover:bg-blue-500"
                            onClick={() => deleteModelFunction(item.model_id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="bg-blue-400 px-6 py-2 rounded-lg text-white hover:bg-blue-500"
                            onClick={() => {
                              setshowDeletePopup(-1);
                              setOpenPopupRowIndex(-1);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  },
  { returnTo: "/" }
);
