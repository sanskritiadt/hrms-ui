import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader'
export default function LoadingPage() {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(1px)' , zIndex:2}}>
      <div className="d-flex justify-content-center align-items-center h-100">
      <MoonLoader
        color='black'
        size={50}
        aria-label="Loading Spinner"
        
      />
      </div>
    </div>
  );
}
