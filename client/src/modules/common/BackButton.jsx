import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center mt-24 gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6"
    >
      🡨 Back
    </button>
  );
};

export default BackButton;
