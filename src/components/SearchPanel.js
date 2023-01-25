import React, {useRef, useState} from "react";

import Datepicker from "react-tailwindcss-datepicker";
import HistoricalApi from "../services/historical.service";

export default function SearchPanel(props) {
  const [zipCode, setZipCode] = useState(78231);
  const [distance, setDistance] = useState(25);
  const [searchDate, setSearchDate] = useState({
    startDate: new Date(new Date()-30*24*60*60*1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [isLoading, setLoading] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);

  const zipCodeElm = useRef(null);
  const distanceElm = useRef(null);

  const handleValueChange = (newValue) => {
    setSearchDate(newValue);
    setInvalidDate(false);
  }

  const historicalContext = props.context;

  const onSubmit = () => {

    if ( !zipCode ) {
      zipCodeElm.current.focus();
      return;
    }

    if ( !distance ) {
      distanceElm.current.focus();
      return;
    }

    if ( !searchDate.startDate ) {
      setInvalidDate(true);
      return;
    }

    historicalContext.init();
    setLoading(true);
    if ( props.onComplete ) props.onComplete(false);

    let currentDate = new Date(searchDate.startDate);
    var requestCount = 0;
    const onSuccess = (res) => {
      historicalContext.push(res);     
      requestCount--;
      if ( requestCount <= 0 ) {
        setLoading(false);
        if ( props.onComplete ) props.onComplete(true);
      }
    }

    const onError = (err) => {
      requestCount--;
      if ( requestCount <= 0 ) {
        setLoading(false);
        if ( props.onComplete ) props.onComplete(true);
      }
    }

    while ( currentDate <= new Date(searchDate.endDate) ) {
      const date = currentDate.toISOString().split('T')[0] + 'T00-0000';
      requestCount++;
      HistoricalApi.get(zipCode, distance, date, onSuccess, onError);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return (
    <div className="sm:flex sm:items-center justify-center">
      <div className="flex flex-col sm:flex-row gap-4">
          <input
            ref={zipCodeElm}
            type="number"
            name="zipcode"
            className="md:w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="ZIP code"
            value={zipCode}
            onChange={(e)=>setZipCode(e.target.value)}
          />
          <input
            ref={distanceElm}
            type="number"
            name="distance"
            className="md:w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Distance"
            value={distance}
            onChange={(e)=>setDistance(e.target.value)}
          />
          {props.customDate && <Datepicker
            inputClassName={`rounded-md ${invalidDate ? 'border-2 !border-indigo-500' : ''} shadow-sm sm:text-sm`}
            placeholder={"Start Date ~ End Date"}
            primaryColor={"indigo"}
            value={searchDate}
            onChange={handleValueChange}
            showShortcuts={true} 
          />}
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading && <svg className="animate-spin ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>}
          {isLoading ? 'Send' : 'Submit'}
        </button>
        
      </div>
    </div>
  );
}