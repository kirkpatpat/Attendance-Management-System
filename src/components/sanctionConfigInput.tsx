"use client";
import React, { Fragment } from "react";

const sanctionConfigInput = () => {
  return (
    <Fragment>
      <div className="flex justify-between items-end space-x-7">
        {/* Flex container for alignment */}
        <div className="flex-1">
          {/* Flex child for input */}
          <label
            htmlFor="frequency1"
            className="block text-xs font-bold mb-1 italic text-gray-300"
          >
            Frequency 1 (Low)
          </label>
          <input
            style={{ backgroundColor: "#EDF1F7" }}
            className="rounded-md py-3 px-6 text-sm w-full italic"
            type="text"
            id="frequency1"
            placeholder="Default value of 1"
          />
        </div>
        <div className="flex-1">
          {/* Flex child for input */}
          <label
            htmlFor="frequency2"
            className="block text-xs font-bold mb-1 italic text-gray-300"
          >
            Frequency 2 (Medium)
          </label>
          <input
            style={{ backgroundColor: "#EDF1F7" }}
            className="rounded-md py-3 px-6 text-sm w-full italic"
            id="frequency2"
            placeholder="Default value of 4"
          />
        </div>
        <div className="flex-1">
          {/* Flex child for input */}
          <label
            htmlFor="frequency3"
            className="block text-xs font-bold mb-1 italic text-gray-300"
          >
            Frequency 3 (High)
          </label>
          <input
            style={{ backgroundColor: "#EDF1F7" }}
            className="rounded-md py-3 px-6 text-sm w-full italic"
            type="text"
            id="frequency3"
            placeholder="Default value of 7"
          />
        </div>
        <button className="bg-purple text-white rounded-md px-6 py-2 font-bold">
          {/* Button aligned to the right */}
          Accept
        </button>
      </div>
    </Fragment>
  );
};

export default sanctionConfigInput;
