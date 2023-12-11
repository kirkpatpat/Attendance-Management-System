"use client";
import React, { Fragment, useState } from "react";

import { Transition } from "@headlessui/react";

import { Dialog } from "@headlessui/react";

const SanctionHomeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const openModal = (data: any) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };
  return (
    <div className="relative overflow-x-auto pt-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 font-bold border-b-2 border-gray-300">
          <tr>
            <th scope="col" className="px-6 py-3 ">
              Student ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Course
            </th>
            <th scope="col" className="px-6 py-3">
              Year
            </th>
            <th scope="col" className="px-6 py-3">
              Remarks
            </th>
            <th scope="col" className="px-6 py-3">
              Sanction
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => openModal("Some Data Blob")}
          >
            <td className="px-6 py-4 ">1801831</td>
            <td className="px-6 py-4">Angelo Valdez</td>
            <td className="px-6 py-4">BSCS</td>
            <td className="px-6 py-4">4</td>
            <td className="px-6 py-4">Absent</td>
            <td className="px-6 py-4">Default</td>
          </tr>
        </tbody>
      </table>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsModalOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* Centering modal content */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {/* Custom modal content starts here */}
                <div className="flex justify-between items-start">
                  {" "}
                  {/* Align items to the start */}
                  {/* Left section */}
                  <div className="space-y-2">
                    {" "}
                    {/* Add spacing between children */}
                    <Dialog.Title
                      as="h1"
                      className="text-4xl font-bold text-purple"
                    >
                      Profile
                    </Dialog.Title>
                    <p className="text-2xl text-purple">Angelo Valdez</p>
                    <p className="text-md text-purple">1801831</p>
                    <p className="text-md text-purple">SEAITE, BSCS-4</p>
                    <p>{selectedData}</p>
                    {/* ... other profile details ... */}
                  </div>
                  {/* Right section */}
                  <div className="ml-10">
                    {" "}
                    {/* Add left margin to separate from the left section */}
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold text-purple"
                    >
                      Summary of Sanctions
                    </Dialog.Title>
                    {/* ... summary table ... */}
                    <div className="mt-2">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              EVENT
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              LATE
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ABSENCES
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total Absences
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {/* Row 1 */}
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {/* Event data */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {/* Late data */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {/* Absences data */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {/* Total Absences data */}
                            </td>
                          </tr>
                          {/* Row 2 */}
                          <tr>{/* ... */}</tr>
                          {/* Row 3 */}
                          <tr>{/* ... */}</tr>
                          {/* Additional rows as needed */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Close button */}
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* Modal content ends here */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SanctionHomeTable;
