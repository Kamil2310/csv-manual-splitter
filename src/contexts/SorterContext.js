import { createContext, useContext, useReducer } from "react";

const SorterContext = createContext();

const initialState = {
  status: "noData",
  data: [],
  isLoading: false,
  curIndex: 0,
  error: "",
  numRows: 0,
  newData: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "data/loading":
      return { ...state, status: action.type, isLoading: true };
    case "data/loaded":
      return {
        ...state,
        status: action.type,
        isLoading: false,
        data: action.payload,
        numRows: action.numRows,
      };
    case "data/jumpIndex":
      return {
        ...state,
        curIndex: action.payload,
      };
    case "data/add":
      return {
        ...state,
        curIndex:
          state.curIndex < state.numRows - 1
            ? state.curIndex + 1
            : state.curIndex,
        newData: [...state.newData, action.payload.id],
      };
    case "data/remove":
      return {
        ...state,
        curIndex:
          state.curIndex < state.numRows - 1
            ? state.curIndex + 1
            : state.curIndex,
      };
    case "error":
      return {
        ...state,
        status: action.type,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function SorterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleAddData() {
    dispatch({ type: "data/add", payload: state.data[state.curIndex] });
  }

  function handleRemoveData() {
    dispatch({ type: "data/remove" });
  }

  function handleDownloadData() {
    const jsonStr = JSON.stringify(state.newData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "filtered-data";
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  }

  return (
    <SorterContext.Provider
      value={{
        status: state.status,
        data: state.data,
        isLoading: state.isLoading,
        curIndex: state.curIndex,
        dispatch: dispatch,
        error: state.error,
        numRows: state.numRows,
        newData: state.newData,
        handleAddData: handleAddData,
        handleRemoveData: handleRemoveData,
        handleDownloadData: handleDownloadData,
      }}
    >
      {children}
    </SorterContext.Provider>
  );
}

function useSorter() {
  const context = useContext(SorterContext);
  if (context === undefined)
    throw new Error("SorterContext was used outside the SorterProvider");
  return context;
}

export { SorterProvider, useSorter };
