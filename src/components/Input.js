import { useSorter } from "../contexts/SorterContext";

function Input() {
  const { dispatch, numRows, curIndex } = useSorter();
  return (
    <div>
      <span>Jump to row... </span>
      <input
        type="text"
        placeholder="Index value"
        value={curIndex}
        onChange={(e) =>
          dispatch({
            type: "data/jumpIndex",
            payload:
              Number(e.target.value) < Number(numRows)
                ? Number(e.target.value) >= 0
                  ? Number(e.target.value)
                  : Number(numRows - 1)
                : Number(numRows - 1),
          })
        }
      ></input>
    </div>
  );
}

export default Input;
