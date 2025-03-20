import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadCSV = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "File upload failed");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold">Upload CSV/XLSX</h2>
      <input type="file" onChange={handleFileChange} className="border p-2" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
        Upload
      </button>
    </div>
  );
};

export default UploadCSV;
