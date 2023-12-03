"use client"
import React, { useState } from 'react';

const Page = () => {
  const [csvData, setCsvData] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string' || content instanceof ArrayBuffer) {
        setCsvData(content.toString());
      }
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#EDF1F7' }}>
   
      <div style={{ width: 326, height: 40, left: 672, top: 481, position: 'absolute', textAlign: 'center', color: '#FF0000', fontSize: 24, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word', display: csvData ? 'none' : 'block' }}>
        NO STUDENT LIST FOUND!
      </div>
      <div style={{ width: 171, height: 37, padding: 10, left: 749, top: 541, position: 'absolute', background: '#0000FF', borderRadius: 6, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex' }}>
        <div style={{ color: 'white', fontSize: 12, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
          </form>
        </div>
      </div>
      {csvData && (
        <div style={{ marginTop: 30 }}>
          <h2>Uploaded CSV Data:</h2>
          <pre>{csvData}</pre>
        </div>
      )}
    </div>
  );
};

export default Page;

