import React, {useEffect, useState} from "react";

import './App.css';
import HistoricalView from "./components/HistoricalView";
import { HistoricalContext } from "./context";

function App() {
  const [rows, setRows] = useState([]);
  const initHistorical = () => setRows([]);
  const pushHistorical = (rows) => setRows((prev)=>[...prev, ...rows]);

  return (
    <HistoricalContext.Provider value={{rows, init: initHistorical, push: pushHistorical}}>
      <HistoricalView />
    </HistoricalContext.Provider>
  );
}

export default App;
