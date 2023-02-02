import React, {useState} from "react";

import './App.css';
import CustomDateRange from "./components/CustomDateRange";
import { HistoricalContext, CustomDateContext } from "./context";
import MainTabView from "./layout/MainTabView";
import Historical from "./components/Historical";

function App() {
  const [rows, setRows] = useState([]);
  const initHistorical = () => setRows([]);
  const pushHistorical = (rows) => setRows((prev)=>[...prev, ...rows]);

  const [crows, setCRows] = useState([]);
  const initCHistorical = () => setCRows([]);
  const pushCHistorical = (rows) => setCRows((prev)=>[...prev, ...rows]);

  const navigation = ['Historical', 'Custom Date Range'];

  const panels = [
    <Historical />,
    <CustomDateRange />
  ]
  
  return (
    <HistoricalContext.Provider value={{rows, init: initHistorical, push: pushHistorical}}>
      {/* <CustomDateContext.Provider value={{rows:crows, init: initCHistorical, push: pushCHistorical}}> */}
        {/* <MainTabView navigation={navigation} panels={panels}/> */}
        <Historical />
      {/* </CustomDateContext.Provider> */}
    </HistoricalContext.Provider>
  );
}

export default App;
