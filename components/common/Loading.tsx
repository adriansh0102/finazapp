'use client'
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa"; // Ícono de carga

interface LoadingSpinnerProps {
  size?: 1 | 2 | 3;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size }) => {


  const [h_container, setH_container] = useState('h-[100vh]')
  const [initialized, setInitialized] = useState(false);

  if ( initialized === false) {
    if ( size && size == 1 ) {
      setH_container('')
    }
    if ( size && size == 2 ) {
      setH_container('h-[85vh]')
    }
    setInitialized(true)
  }


  return (
    <div className={`flex items-center justify-center w-full ${h_container}`}>
      <FaSpinner className="text-5xl text-blue-500 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;