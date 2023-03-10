import {createContext} from 'react';

const HistoricalContextDefaultValues = {
  rows: [],
  push: (rows) => {},
  init: () => {},
}
export const HistoricalContext = createContext(HistoricalContextDefaultValues);
export const CustomDateContext = createContext(HistoricalContextDefaultValues);