"use client";

import { useState } from "react";
import Button from "../atoms/Button";
import { toast } from "react-toastify";

const BulkCreation = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_REST_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      toast.success(result?.message);
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
    }
  };

  return (
    <article className="flex flex-col items-center justify-center gap-3 min-h-screen">
      <p className="text-2xl font-medium text-jet-black text-center">
        Create products in bulk
      </p>
      <p className="w-4/5 md:w-3/5 text-sm text-gray-600 text-center">
        Upload a CSV file with product details. The file should have the
        following columns: title, categoryIds, description, price, rent,
        rentOption, sellerId. Each row represents a product.
      </p>
      <div className="flex items-center gap-2">
        <input
          id="file"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block mx-auto my-4 sr-only"
        />
        <label
          htmlFor="file"
          className="inline-block px-2 py-1 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Choose file
        </label>

        {selectedFile && (
          <p className="text-cente text-gray-700">{selectedFile.name}</p>
        )}
      </div>
      <Button onClick={handleUpload} text="Upload" variant="button-primary" />
      {message && <p className="text-sm">{message}</p>}
    </article>
  );
};

export default BulkCreation;
