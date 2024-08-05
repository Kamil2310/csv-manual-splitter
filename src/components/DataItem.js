function DataItem({ value, index }) {
  //console.log(`index: ${index}, value: ${value}`);
  return (
    <div>
      <span
        className={`data-element flex-center ${
          parseInt(index, 10) % 2 ? "even" : "odd"
        }`}
      >
        <span> {value[1]}</span>
      </span>
    </div>
  );
}

export default DataItem;
