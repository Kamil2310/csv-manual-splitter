import { useSorter } from "../contexts/SorterContext";
import DataItem from "./DataItem";

function CurrentRow() {
  const { data, curIndex } = useSorter();
  console.log(`Data: ${data[curIndex]} for index: ${curIndex}`);
  return (
    <>
      <div>
        {Object.entries(data[curIndex]).map((value, index) => (
          <DataItem key={index} value={value} index={index} />
        ))}
      </div>
    </>
  );
}

export default CurrentRow;
