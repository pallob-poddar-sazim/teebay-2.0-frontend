import { PROCESS_CSV } from "@/shared/graphql/mutations/files";
import { GET_PRESIGNED_URL } from "@/shared/graphql/queries/files";
import { TApiResponse } from "@/shared/typedefs";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

export const useProductBulkCreation = (
  selectedFile: File | null,
  setMessage: (message: string) => void,
) => {
  const [getPresignedUrl] = useLazyQuery(GET_PRESIGNED_URL);
  const [processCSV] = useMutation(PROCESS_CSV);

  const handleResponse = (data: TApiResponse<{ key: string }>) => {
    if (data.success) toast.success("File uploaded successfully", { theme: "colored" });
    else toast.error(data.message, { theme: "colored" });
  };

  const onUpload = async () => {
    if (!selectedFile) {
      setMessage("No file selected.");
      return;
    }

    try {
      const { data: fileData } = await getPresignedUrl({
        variables: { name: selectedFile.name, type: selectedFile.type },
        fetchPolicy: "network-only",
      });

      const signedUrl = fileData?.getPresignedUrl?.data?.signedUrl;
      if (!signedUrl) {
        toast.error("Failed to upload the file");
        return;
      }

      const response = await fetch(signedUrl, {
        method: "PUT",
        body: selectedFile,
      });
      if (!response.ok) {
        toast.error("Failed to upload the file");
      }

      const { data } = await processCSV({ variables: { key: selectedFile.name } });
      handleResponse(data.processCSV);
    } catch (err) {
      console.error(err);
    }
  };

  return { onUpload };
};
