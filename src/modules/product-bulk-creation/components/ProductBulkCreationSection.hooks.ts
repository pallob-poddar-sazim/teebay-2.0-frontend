import { toast } from "react-toastify";

export const useProductBulkCreation = (
  selectedFile: File | null,
  setMessage: (message: string) => void,
) => {
  const onUpload = async () => {
    if (!selectedFile) {
      setMessage("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_REST_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      toast.success(result?.message);
    } catch (err) {
      console.error(err);
    }
  };

  return { onUpload };
};
