"use client";
import React, { useState } from 'react';
import Papa from 'papaparse';

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
    const headerRow = Object.keys(filteredData[0]).join(',');
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
      {filteredData.length > 0 && (
        <div>
          <button onClick={exportCSV} style={{ marginTop: '10px' }}>Export CSV</button>
          <h2>Student Records</h2>
          
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {Object.keys(filteredData[0]).map((columnName, index) => (
                  <th key={index}>
                    <div style={{ cursor: 'pointer' }}>
                      {columnName}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {filteredData.map((row, filteredIndex) => {
                const originalIndex = filteredIndices[filteredIndex];
                return (
                  <tr key={filteredIndex}>
                    {Object.values(row).map((cell: any, cellIndex) => (
                      <td key={cellIndex} style={{ border: '1px solid #000', padding: '8px' }}>
                        {cell}
                      </td>
                    ))}
                    <td>
                      <button onClick={() => recordTime(originalIndex, 'timeIn')}>Time-In</button>
                    </td>
                    <td></td>
                    <td>
                      <button onClick={() => recordTime(originalIndex, 'timeOut')}>Time-Out</button>
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
