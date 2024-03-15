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
  { name: "Name", uid: "name" },
  { name: "Source", uid: "source" },
  { name: "Dataset Id", uid: "dataset_id" },
  { name: "Task", uid: "task" },
  { name: "More", uid: "more" },
];

export default withPageAuthRequired(
  function Models() {
    const { data } = useSWR("/api/datasets", fetcher);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
      if (data?.data) {
        setRowData(data.data);
      }
    }, [data]);

    if (data === undefined)
      return <div className="dataset-table-skeleton"></div>;

    if (data.data?.error_description)
      return (
        <div className="w-full h-[500px] flex justify-center items-center px-8">
          {data.data.error_description}
        </div>
      );

    return (
      <div className="m-6 bg-white shadow-lg rounded-[12px] min-h-[600px] overflow-y-scroll px-4 mt-8">
        <h2 className="font-semibold text-md">All Datasets</h2>
        <table className="relative">
          <thead>
            <tr>
              {columns.map((items, index) => (
                <th
                  className={`text-sm font-normal text-[#808080] pb-2 ${
                    items.name == "More"
                      ? "text-right bg-white z-10"
                      : items.name == "Source" ||
                        "Tier" ||
                        "Task" ||
                        "Base Model"
                      ? "min-w-[100px] max-w-[100px]"
                      : ""
                  }`}
                  key={index}
                >
                  {items.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowData?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="cursor-pointer hover:bg-[#F7FAFB] overflow-scroll"
                >
                  <td className="flex gap-2 py-2">
                    <div>
                      {" "}
                      <h2 className="text-sm font-semibold text-[#2D2E34]">
                        {item.dataset_name}
                      </h2>
                    </div>
                  </td>
                  <td className="text-sm font-medium text-[#2D2E34] capitalize">
                    {item.source}
                  </td>
                  <td className="text-sm font-medium text-[#2D2E34] capitalize">
                    {item.dataset_id}
                  </td>
                  <td className="text-sm font-medium text-[#2D2E34] capitalize">
                    {item.task === "" ? "-" : item.task}
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
                    />
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
