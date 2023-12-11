"use client";
import React, { Fragment } from "react";

const sanctionClarityInput = () => {
  return (
    <Fragment>
      <div className="flex justify-between items-end space-x-4">
        <div className="flex-1">
          <input
            style={{ backgroundColor: "#EDF1F7" }}
            className="rounded-md py-3 px-6 text-sm w-full"
            type="text"
            id="frequency3"
            placeholder="Ask me anything"
          />
        </div>
        <button className="bg-purple text-white rounded-md px-6 py-2 font-bold">
          {/* Button aligned to the right */}
          Enter
        </button>
      </div>
    </Fragment>
  );
};

export default sanctionClarityInput;
