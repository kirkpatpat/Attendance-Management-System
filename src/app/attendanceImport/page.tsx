"use client";
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

type RowData = {
  'Morning Time-In': string;
  'Morning Time-Out': string;
  'Afternoon Time-In': string;
  'Afternoon Time-Out': string;
  'Student ID': string;
  'First Name': string;
  'Last Name': string;
  'Course': string;
  'Year': string;
};

const departments = ["SEAITE", "SABH", "SEAS", "SHAS", "BsEd"];
const events = ["Foundation", "Intramurals", "SEAITE Week", "SABH Week", "SEAS Week", "SHAS Week"];


const Page = () => {
  const [csvData, setCsvData] = useState<string | null>(null);
  const [tableData, setTableData] = useState<RowData[]>([]);
  const [showFileInput, setShowFileInput] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [originalIndices, setOriginalIndices] = useState<number[]>([]);


  const [defaultDate, setDefaultDate] = useState<string>('');

  const [selectedDate, setSelectedDate] = useState<string>(''); // State to manage selected date

  useEffect(() => {
    // Function to format date as YYYY-MM-DD
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, '0');
      const day = `${date.getDate()}`.padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const today = new Date();
    const formattedDate = formatDate(today);
    setSelectedDate(formattedDate); // Set default date to today's date
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value); // Update selected date on user input
  };

    // Initialize default time values (in HHmm format)
    const defaultCallTimeAmIn = 830;
    const defaultCallTimeAmOut = 1130;
    const defaultCallTimePmIn = 1330;
    const defaultCallTimePmOut = 1730;
  
    // Use the useState hook to set the default time values
    const [callTimeAmIn, setCallTimeAmIn] = useState<number>(defaultCallTimeAmIn);
    const [callTimeAmOut, setCallTimeAmOut] = useState<number>(defaultCallTimeAmOut);
    const [callTimePmIn, setCallTimePmIn] = useState<number>(defaultCallTimePmIn);
    const [callTimePmOut, setCallTimePmOut] = useState<number>(defaultCallTimePmOut);
  
    // Function to format time from number to HH:mm string
    const formatTime = (time: number): string => {
      const hours = Math.floor(time / 100).toString().padStart(2, '0');
      const minutes = (time % 100).toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };
  
    // Effect to update time inputs when default time values change
    useEffect(() => {
      setCallTimeAmIn(defaultCallTimeAmIn);
      setCallTimeAmOut(defaultCallTimeAmOut);
      setCallTimePmIn(defaultCallTimePmIn);
      setCallTimePmOut(defaultCallTimePmOut);
    }, [defaultCallTimeAmIn, defaultCallTimeAmOut, defaultCallTimePmIn, defaultCallTimePmOut]);
  

  const handleTimeInputChange = (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
    const inputValue = event.target.value;
    const parsedTime = parseTimeTo24Hour(inputValue);
    setter(parsedTime);
  };
  
  const parseTimeTo24Hour = (time: string): number => {
    const [hours, minutes] = time.split(':').map((part) => parseInt(part, 10));
    return hours * 100 + minutes;
  };


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
          const nonEmptyRows = result.data.filter(row => row && row.length > 0);

          while (nonEmptyRows.length > 0 && nonEmptyRows[nonEmptyRows.length - 1].every(cell => !cell)) {
            nonEmptyRows.pop();
          }
  
          if (nonEmptyRows.length > 0) {
          const headerRow = nonEmptyRows[0]; // Extract header row
          const dataRows = nonEmptyRows.slice(1); // Extract data rows

          const initialTableData: RowData[] = dataRows.map((row) => {
            const rowData: RowData = {
              'Student ID': row[0] || '',
              'First Name': row[1] || '',
              'Last Name':  row[2] || '',
              'Course':     row[3] || '',
              'Year':       row[4] || '',
              'Morning Time-In': row[5] || '',
              'Morning Time-Out': row[6] || '',
              'Afternoon Time-In': row[7] || '',
              'Afternoon Time-Out': row[8] || ''
            };
            return rowData;
          });

          setTableData(initialTableData);
          setOriginalIndices(Array.from({ length: initialTableData.length }, (_, index) => index));
        }
      }
    },
    header: false,
  });
};
  
  
  
  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const recordTime = (originalIndex: number, type: string) => {
    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();
  
    // Ensure minutes are formatted correctly
    const minutes = String(nowMinutes).padStart(2, '0');
  
    // Format the time as HH:MM
    const time = `${nowHours}:${minutes}`;
  
    // Calculate hours based on a numeric representation of time
    const hours = parseInt(`${nowHours.toString().padStart(2, '0')}${minutes}`, 10);
  
    const dataIndex = originalIndices.indexOf(originalIndex);
    if (dataIndex !== -1) {
     setTableData((prevTableData) => {
    const updatedTableData = [...prevTableData];
    const rowToUpdate = updatedTableData[dataIndex];

    if (rowToUpdate) {
      switch (type) {
        case 'timeIn':
          if (hours < callTimeAmIn && hours < 1200) {
            rowToUpdate['Morning Time-In'] = time;
           
          } else if (hours > callTimeAmIn && hours < 1200) {
            rowToUpdate['Morning Time-In'] = 'Absent';

          } else if (hours < callTimePmIn && hours > 1200) {
            rowToUpdate['Afternoon Time-In'] = time;
          
          }else if(hours > callTimePmIn){
            rowToUpdate['Afternoon Time-In'] = 'Absent';
          }

          break;
    
        case 'timeOut':
          if (hours < callTimeAmOut && hours < 1200) {
            rowToUpdate['Morning Time-Out'] = time;
          
          } else if (hours < 1200 && hours > callTimeAmOut) {
            rowToUpdate['Morning Time-Out'] = 'Absent';
          
          } else if (hours < callTimePmOut && hours > 1200) {
            
            rowToUpdate['Afternoon Time-Out'] = time;
          
          }else if(hours> callTimePmOut && hours > 1200){
            rowToUpdate['Afternoon Time-Out'] = 'Absent';

          }
          break;
    
        default:
          break;
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
  
    const csvRows = filteredData.map(row => {
      const rowData = Object.assign({}, row); // Create a copy of the row data
  
      // Check for empty values in time columns and replace them with 'Absent'
      if (!rowData['Morning Time-In'] || !rowData['Morning Time-Out'] || !rowData['Afternoon Time-In'] || !rowData['Afternoon Time-Out']) {
        rowData['Morning Time-In'] = rowData['Morning Time-In'] || 'Absent';
        rowData['Morning Time-Out'] = rowData['Morning Time-Out'] || 'Absent';
        rowData['Afternoon Time-In'] = rowData['Afternoon Time-In'] || 'Absent';
        rowData['Afternoon Time-Out'] = rowData['Afternoon Time-Out'] || 'Absent';
      }
  
      return Object.values(rowData).join(',');
    });
  
    const csvContent = `${headerRow}\n${csvRows.join('\n')}`;
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

  const handleCellEdit = (originalIndex: number, columnName: keyof RowData, value: string) => {
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
          className="items-center justify-center"
          style={{
            width: 171,
            height: 37,
            padding: 10,
            left: 560,
            top: 300,
            position: 'absolute',
            background: '#0000FF',
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
      
         
          <div  style={{ color: 'black', fontSize: 10, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>
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
              //value={defaultDate}
              value={selectedDate} // Set the selected date value here
              onChange={handleDateChange} // Update selected date on user input
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
              className={`bg-${isEditMode ? 'blue' : 'blue'}-500 hover:bg-${isEditMode ? 'green' : 'blue'}-700 text-white font-bold py-2 px-4 rounded-full`}
              style={{ marginTop: '10px', color:'white' }}
              onClick={handleEditClick}
            >
              {isEditMode ? 'SAVE' : 'EDIT'}
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={exportCSV} style={{ marginTop: '10px' }}>EXPORT</button>
          </div>

          <div className="flex flex-row justify-start gap-4">
            <div className="flex flex-col items-center my-1">
            <label htmlFor="">Call Time AM-IN</label>
                <input
                type="time"
                id="callTimeAmInInput"
                name="callTimeAmInInput"
                className="appearance-none border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-full"
                value={formatTime(callTimeAmIn)} // Use the formatTime function to display the default values
                onChange={(e) => handleTimeInputChange(e, setCallTimeAmIn)}
              />
            </div>
            <div className="flex flex-col items-center my-1">
            <label htmlFor="">Call Time AM-OUT</label>
            <input
              type="time"
              id="timeInput"
              name="timeInput"
              className="appearance-none border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-full e"
              value={formatTime(callTimeAmOut)} // Use the formatTime function to display the default values
              onChange={(e) => handleTimeInputChange(e, setCallTimeAmOut)}
            />
            </div>
            <div className="flex flex-col items-center my-1">
            <label htmlFor="">Call Time PM-IN</label>
            <input
              type="time"
              id="timeInput"
              name="timeInput"
              className="appearance-none border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-full e"
              value={formatTime(callTimePmIn)} // Use the formatTime function to display the default values
              onChange={(e) => handleTimeInputChange(e, setCallTimePmIn)}
            />
            </div>
            <div className="flex flex-col items-center my-1">
            <label htmlFor="">Call Time PM-OUT</label>
            <input
              type="time"
              id="timeInput"
              name="timeInput"
              className="appearance-none border rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded-full e"
              value={formatTime(callTimePmOut)} // Use the formatTime function to display the default values
              onChange={(e) => handleTimeInputChange(e, setCallTimePmOut)}
            />
            </div>
          </div>
            <table className='border-collapse w-100'>
            <colgroup>
              {/* Specify fixed widths for each column */}
              {Object.keys(filteredData[0]).map((_, index) => (
                <col key={index} style={{ width: '190px' }} />
              ))}
              {/* Additional columns for buttons */}
              <col style={{ width: '100px' }} />
              <col style={{ width: '50px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '50px' }} />
            </colgroup>
              <thead className="bg-sky-300">
                <tr>
                  {Object.keys(filteredData[0]).map((columnName, index) => (
                    <th className="text-neutral-950 " key={index}>
                      <div style={{ cursor: 'pointer' }}>
                        {columnName}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead >
              <tbody className='text-center'>
              {filteredData.map((row, filteredIndex) => {
                const originalIndex = filteredIndices[filteredIndex];
                return (
                  <tr key={originalIndex}>
                    {Object.keys(row).map((columnName) => (
                      <td key={columnName} className="bg-sky-100 border-b dark:border-gray-700" style={{  padding: '8px' }}>
                        {/* Conditionally render input or plain text based on edit mode */}
                        {isEditMode ? (
                          <input
                            type="text"
                            value={row[columnName as keyof RowData]} // Assert columnName as keyof RowData
                            onChange={(e) => handleCellEdit(originalIndex, columnName as keyof RowData, e.target.value)} // Assert columnName as keyof RowData
                            style={{ width: '100%' }}
                          />
                        ) : (
                          row[columnName as keyof RowData] // Assert columnName as keyof RowData
                        )}
                        </td>
                      ))}
                      {/* Buttons for time-in and time-out */}
                      <td>
                        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-max" onClick={() => recordTime(originalIndex, 'timeIn')}>Time-In</button>
                      </td>
                      <td></td>
                      <td>
                        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-max" onClick={() => recordTime(originalIndex, 'timeOut')}>Time-Out</button>
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

