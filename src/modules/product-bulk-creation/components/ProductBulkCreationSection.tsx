"use client";

import { Button } from "@/shared/components/shadui/button";
import { Input } from "@/shared/components/shadui/input";
import { useState } from "react";
import { useProductBulkCreation } from "./ProductBulkCreationSection.hooks";

const ProductBulkCreationSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const { onUpload } = useProductBulkCreation(selectedFile, setMessage);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <>
      <p className="text-2xl font-medium text-jet-black text-center">Create products in bulk</p>
      <p className="w-4/5 md:w-3/5 text-sm text-gray-600 text-center">
        Upload a CSV file with product details. The file should have the following columns: title,
        categoryIds, description, price, rent, rentOption, sellerId. Each row represents a product.
      </p>
      <div className="flex items-center gap-2">
        <Input
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

        {selectedFile && <p className="text-cente text-gray-700">{selectedFile.name}</p>}
      </div>
      <Button onClick={onUpload}>Upload</Button>
      {message && <p className="text-sm">{message}</p>}
    </>
  );
};

export default ProductBulkCreationSection;
