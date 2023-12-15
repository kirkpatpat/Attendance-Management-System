"use client";
import React, { useState } from 'react';
import Papa from 'papaparse';



const departments = ["SEAITE", "SABH", "SEAS", "SHAS"];
const events = ["Foundation", "Intramurals"];


const Page = () => {
  
  const [csvData, setCsvData] = useState<string | null>(null);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [showFileInput, setShowFileInput] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [sortByColumn, setSortByColumn] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [originalIndices, setOriginalIndices] = useState<number[]>([]);
 

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string' || content instanceof ArrayBuffer) {
        setCsvData(content.toString());
        parseCSV(content.toString());
        setShowFileInput(false); // Hide file input after CSV import
      }
    };
  
    if (file) {
      reader.readAsText(file);
    }
      
  };

  const parseCSV = (csvContent: string) => {
    Papa.parse<string[]>(csvContent, {
      complete: (result) => {
        if (result.data && result.data.length > 0) {
          setTableData(result.data);
          setOriginalIndices(result.data.map((_, index) => index));
        }
      },
      header: true, // Assume the CSV file contains header row
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const recordTime = (originalIndex: number, type: string) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;
  
    const dataIndex = originalIndices.indexOf(originalIndex);
    if (dataIndex !== -1) {
      setTableData((prevTableData) => {
        const updatedTableData = [...prevTableData];
        const rowToUpdate = updatedTableData[dataIndex];
  
        if (rowToUpdate) {
          if (type === 'timeIn') {
            if (hours < 12) {
              rowToUpdate['Morning Time-In'] = time;
            } else {
              if (!rowToUpdate['Morning Time-In']) {
                rowToUpdate['Morning Time-In'] = 'Absent';
                rowToUpdate['Morning Time-Out'] = 'Absent';
              }
  
              rowToUpdate['Afternoon Time-In'] = time;
            }
          } else if (type === 'timeOut') {
            if (hours < 12) {
              rowToUpdate['Morning Time-Out'] = time;
            } else {
              if (!rowToUpdate['Afternoon Time-In']) {
                rowToUpdate['Morning Time-In'] = 'Absent';
                rowToUpdate['Morning Time-Out'] = 'Absent';
                rowToUpdate['Afternoon Time-In'] = 'Absent';
              }
  
              rowToUpdate['Afternoon Time-Out'] = time;
            }
          }
        }
  
        return updatedTableData;
      });
    }
  };

  const filteredIndices = originalIndices.filter((index) =>
  Object.values(tableData[index]).some((cell: any) =>
    String(cell).toLowerCase().includes(searchText.toLowerCase())
  )
);

  const filteredData = filteredIndices.map((index) => tableData[index]);

  // Render the filteredData including the first row
  {filteredData.map((row, filteredIndex) => {
    const originalIndex = filteredIndices[filteredIndex];
    return (
      <tr key={originalIndex}>
        {/* try maglagay ng column para fixed*/}
      </tr>
    );
  })}

  const exportCSV = () => {
    // Get selected department and event
    const selectedDepartment = (document.getElementById('department') as HTMLSelectElement)?.value || 'Department';
    const selectedEvent = (document.getElementById('event') as HTMLSelectElement)?.value || 'Event';
    const selectedDate = (document.getElementById('date') as HTMLInputElement)?.value || 'Date';
  
    const headerRow = `Department: ${selectedDepartment}, Event: ${selectedEvent}, Date: ${selectedDate}\n${Object.keys(filteredData[0]).join(',')}`;
    const csvRows = [
      headerRow,
      ...filteredData.map(row => {
        // Check for time in and time out, mark as 'Absent' if not present
        if (!row['Morning Time-In'] || !row['Morning Time-Out'] || !row['Afternoon Time-In'] || !row['Afternoon Time-Out']) {
          row['Morning Time-In'] = 'Absent';
          row['Morning Time-Out'] = 'Absent';
          row['Afternoon Time-In'] = 'Absent';
          row['Afternoon Time-Out'] = 'Absent';
        }
        return Object.values(row).join(',');
      })
    ];
  
    const csvContent = csvRows.join('\n');
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'student_records_Attendance.csv');
    document.body.appendChild(link);
    link.click();
  };
  
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode((prevEditMode) => !prevEditMode);
  };

  const handleCellEdit = (originalIndex, columnName, value) => {
    setTableData((prevTableData) => {
      const updatedTableData = [...prevTableData];
      const dataIndex = originalIndices.indexOf(originalIndex);
      if (dataIndex !== -1) {
        const rowToUpdate = { ...updatedTableData[dataIndex] };
        rowToUpdate[columnName] = value;
        updatedTableData[dataIndex] = rowToUpdate;
      }
      return updatedTableData;
    });
  };
 
  return (
  
   
    
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#EDF1F7' }}>
      
       
      
      {showFileInput ? (
        <div
          style={{
            width: 171,
            height: 37,
            padding: 10,
            left: 749,
            top: 541,
            position: 'absolute',
            background: '#0000FF',
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
      
         
          <div style={{ color: 'black', fontSize: 10, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="file" accept=".csv" onChange={handleFileUpload} />
            </form>
          </div>
        </div>
      ) : null}
     
       <div className="w-[164px] h-[58px] top-[-13px] relative bg-white rounded-md border border-gray-300">
          <div className="w-[191.40px] h-[49.30px] pl-[11.05px] pr-[89.35px] pt-[5px] pb-[13px] opacity-60 justify-start items-start flex">
            <label
              htmlFor="department"
              className="text-neutral-700 text-base font-normal font-['Open Sans'] leading-normal"
            >
              Department
            </label>
          </div>
          <div className="pr-[42px] left-[13px] top-[27px] absolute justify-start items-start inline-flex">
            <select
              id="department"
              className="text-neutral-800 text-base font-normal font-open-sans leading-tight w-full h-full border-none outline-none bg-transparent"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>  
        
        <div className="left-[178px] top-[-13px] absolute justify-start items-start inline-flex">
        <div className="w-[164px] h-[58px] relative bg-white rounded-md border border-gray-300">
          <div className="w-[142.40px] pl-[11.05px] pr-[89.35px] pt-[5px] pb-[13px] opacity-60 justify-start items-start flex">
            <label
              htmlFor="event"
              className="text-neutral-700 text-base font-normal font-['Open Sans'] leading-normal"
            >
              Event
            </label>
          </div>
          <div className="pr-[42px] left-[13px] top-[27px] absolute justify-start items-start inline-flex">
            <select
              id="event"
              className="text-neutral-800 text-base font-normal font-open-sans leading-tight w-full h-full border-none outline-none bg-transparent"
            >
              {events.map((event) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
            </select>
          </div>
        </div>
        </div>
        
        <div className="left-[358px] top-[-13px] absolute justify-start items-start inline-flex">
        <div className="w-[164px] h-[58px] relative bg-white rounded-md border border-gray-300">
          <div className="w-[142.40px] pl-[11.05px] pr-[89.35px] pt-[5px] pb-[13px] opacity-60 justify-start items-start flex">
            <label
              htmlFor="event"
              className="text-neutral-700 text-base font-normal font-['Open Sans'] leading-normal"
            >
              Date
            </label>
          </div>
          <div className="pr-[42px] left-[13px] top-[27px] absolute justify-start items-start inline-flex">
            <input
              type="date"
              id="date"
              className="text-neutral-800 text-base font-normal font-open-sans leading-tight w-full h-full border-none outline-none bg-transparent"
            />
          </div>
        </div>
      </div>
      
      <div className="w-[1336px] bg-white rounded-md border border-black dlex items-centre">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          className="w-full h-full border-none outline-none bg-transparent pl-3"
        />
      </div>
      {filteredData.length > 0 && (
        <div>

          <div className="flex flex-row justify-end gap-4">
          <button
            className={`bg-${isEditMode ? 'green' : 'blue'}-500 hover:bg-${isEditMode ? 'green' : 'blue'}-700 text-white font-bold py-2 px-4 rounded-full`}
            style={{ marginTop: '10px' }}
            onClick={handleEditClick}
          >
            {isEditMode ? 'SAVE' : 'EDIT'}
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={exportCSV} style={{ marginTop: '10px' }}>EXPORT</button>
          </div>

          <h2>Student Records</h2>
          
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead class="bg-sky-300 shadow-md ">
              <tr>
                {Object.keys(filteredData[0]).map((columnName, index) => (
                  <th class="text-neutral-950 " key={index}>
                    <div style={{ cursor: 'pointer' }}>
                      {columnName}
                    </div>
                  </th>
                ))}
              </tr>
            </thead >
            <tbody>
            {filteredData.map((row, filteredIndex) => {
              const originalIndex = filteredIndices[filteredIndex];
              return (
                    <tr className="bg-sky-100" key={originalIndex}>
                      {Object.keys(row).map((columnName, cellIndex) => (
                        <td key={columnName} style={{ border: '1px solid #000', padding: '8px' }}>
                          {isEditMode ? (
                            <input
                              type="text"
                              value={row[columnName]}
                              onChange={(e) => handleCellEdit(originalIndex, columnName, e.target.value)}
                            />
                          ) : (
                            row[columnName]
                          )}
                    </td>
                    ))}
                    <td>
                      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => recordTime(originalIndex, 'timeIn')}>Time-In</button>
                    </td>
                    <td></td>
                    <td>
                      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => recordTime(originalIndex, 'timeOut')}>Time-Out</button>
                    </td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
  
};

export default Page;

