"use client"
import React, { useState } from 'react';
import Papa from 'papaparse';

const Page = () => {
  const [csvData, setCsvData] = useState<string | null>(null);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [showFileInput, setShowFileInput] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [sortByColumn, setSortByColumn] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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
        }
      },
      header: true, // Assume the CSV file contains header row
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  
  

  const recordTime = (rowIndex: number, type: string) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;
  
    setTableData((prevTableData) => {
      const updatedTableData = [...prevTableData];
      const rowToUpdate = updatedTableData[rowIndex];
  
      if (rowToUpdate) {
        if (type === 'timeIn') {
          if (hours < 12) {
            rowToUpdate['Morning Time-In'] = time;
          } else {
            // Check if Morning Time-In is empty, then mark as absent
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
  };
  
  
  

  const filteredData = tableData.filter((row, index) =>
    index === 0
      ? true // Include header row in filtering
      : Object.values(row).some((cell: any) =>
          String(cell).toLowerCase().includes(searchText.toLowerCase())
        )
  );

  const sortedData = sortByColumn
    ? filteredData.sort((a, b) => {
        const comparison = a[sortByColumn].localeCompare(b[sortByColumn]);
        return sortOrder === 'asc' ? comparison : -comparison;
      })
    : filteredData;

    const exportCSV = () => {
      const headerRow = Object.keys(sortedData[0]).join(',');
      const csvRows = [
        headerRow,
        ...sortedData.map(row => {
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
      <div style={{ color: 'white', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </form>
      </div>
    </div>
    ) : null}

      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          style={{ marginBottom: '10px' }}
        />
      </div>
      {sortedData.length > 0 && (
        <div>
          <button onClick={exportCSV} style={{ marginTop: '10px' }}>Export CSV</button>
          <h2>Student Records</h2>
          
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {Object.keys(sortedData[0]).map((columnName, index) => (
                  <th key={index}>
                    <div
                      style={{ cursor: 'pointer' }}
                      
                    >
                      {columnName}
                    </div>
                  </th>
                ))}
          
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((cell: any, cellIndex) => (
                    <td key={cellIndex} style={{ border: '1px solid #000', padding: '8px' }}>
                      {cell}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => recordTime(rowIndex, 'timeIn')}>Time-In</button>
                  </td>
                  <td></td>
                  <td>
                    <button onClick={() => recordTime(rowIndex, 'timeOut')}>Time-Out</button>
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;


