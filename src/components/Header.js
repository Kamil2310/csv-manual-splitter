import { useSorter } from "../contexts/SorterContext";

function Header() {
  const { curIndex, numRows } = useSorter();
  return (
    <h1>
      <span>
        Currently displaying row <strong>{curIndex + 1}</strong> out of{" "}
        {numRows}
      </span>
    </h1>
  );
}

export default Header;
