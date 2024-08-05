import Papa from "papaparse";
import { useDropzone } from "react-dropzone";
import { useSorter } from "../contexts/SorterContext";

export default function LoadData() {
  const { dispatch } = useSorter();

  const onDrop = (acceptedFiles) => {
    dispatch({ type: "data/loading" });
    const file = acceptedFiles[0];
    try {
      if (file && file.type === "text/csv") {
        const reader = new FileReader();
        reader.onload = () => {
          const csvData = reader.result;
          Papa.parse(csvData, {
            header: true,
            complete: (result) => {
              const jsonData = result.data.slice(0);
              console.log(jsonData);
              console.log(`Length: ${jsonData.length} Data: ${jsonData}`);
              dispatch({
                type: "data/loaded",
                payload: jsonData,
                numRows: jsonData.length,
              });
            },
          });
        };
        reader.readAsText(file);
      }
    } catch {
      dispatch({
        type: "error",
        payload: "An error occured when loading your file",
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}
