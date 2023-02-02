import React, {useState} from "react";

import './App.css';
import { HistoricalContext } from "./context";
import Historical from "./components/Historical";

function App() {
  const [rows, setRows] = useState([]);
  const initHistorical = () => setRows([]);
  const pushHistorical = (rows) => setRows((prev)=>[...prev, ...rows]);

  return (
    <HistoricalContext.Provider value={{rows, init: initHistorical, push: pushHistorical}}>
        <Historical />
    </HistoricalContext.Provider>
  );
}

export default App;
