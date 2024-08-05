import { useSorter } from "../contexts/SorterContext";
import LoadData from "./LoadData";
import Status from "./Status";
import Header from "./Header";
import Input from "./Input";
import Button from "./Button";
import CurrentRow from "./CurrentRow";
import useKey from "./UseKey";

function App() {
  const { status, handleAddData, handleRemoveData, handleDownloadData } =
    useSorter();

  useKey("ArrowRight", handleAddData);
  useKey("ArrowLeft", handleRemoveData);

  return (
    <div className="flex-col">
      <div>
        {status === "noData" && <LoadData />}
        {status === "data/loaded" && (
          <div className="section">
            <Button action={handleRemoveData}>
              <strong>Remove</strong>
            </Button>
            <div className="main-box">
              <Header />
              <Input />
              <CurrentRow />
              <Status />
            </div>
            <Button action={handleAddData}>
              <strong>Add</strong>
            </Button>
          </div>
        )}
      </div>
      <Button action={handleDownloadData}>Download</Button>
    </div>
  );
}

export default App;
