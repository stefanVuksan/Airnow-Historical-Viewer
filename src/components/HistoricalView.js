import React, {useRef, useState, useContext} from "react";

import Datepicker from "react-tailwindcss-datepicker";
import HistoricalApi from "../services/historical.service";
import { HistoricalContext } from "../context";

function HistoricalView() {
  const [zipCode, setZipCode] = useState('');
  const [distance, setDistance] = useState(25);
  const [searchDate, setSearchDate] = useState({
    startDate: null,
    endDate: null
  });
  const [isLoading, setLoading] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);

  const zipCodeElm = useRef(null);
  const distanceElm = useRef(null);

  const handleValueChange = (newValue) => {
    setSearchDate(newValue);
    setInvalidDate(false);
  }

  const historicalContext = useContext(HistoricalContext);

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

    let currentDate = new Date(searchDate.startDate);
    var requestCount = 0;
    const onSuccess = (res) => {
      historicalContext.push(res);     
      requestCount--;
      if ( requestCount <= 0 ) setLoading(false);
    }

    const onError = (err) => {
      requestCount--;
      if ( requestCount <= 0 ) setLoading(false);
    }

    while ( currentDate <= new Date(searchDate.endDate) ) {
      const date = currentDate.toISOString().split('T')[0] + 'T00-0000';
      requestCount++;
      HistoricalApi.get(zipCode, distance, date, onSuccess, onError);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  const historicals = historicalContext.rows;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Historical View</h1>
          <p className="mt-2 text-sm text-gray-700">
            
          </p>
        </div>
      </div>
      <div className="sm:flex sm:items-center justify-center">
        <div className="flex flex-col sm:flex-row gap-4">
            <input
              ref={zipCodeElm}
              type="number"
              name="zipcode"
              className="w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="ZIP code"
              value={zipCode}
              onChange={(e)=>setZipCode(e.target.value)}
            />
            <input
              ref={distanceElm}
              type="number"
              name="distance"
              className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Distance"
              value={distance}
              onChange={(e)=>setDistance(e.target.value)}
            />
            <Datepicker
              inputClassName={`rounded-md ${invalidDate ? 'border-2 !border-indigo-500' : ''} shadow-sm sm:text-sm`}
              placeholder={"Start Date ~ End Date"}
              primaryColor={"indigo"}
              value={searchDate}
              onChange={handleValueChange}
              showShortcuts={true} 
            />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
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
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      DateObserved
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      HourObserved
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      LocalTimeZone
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      ReportingArea
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      StateCode
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Latitude
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Longitude
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      ParameterName
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      AQI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {historicals.sort((a,b)=>new Date(a.DateObserved)-new Date(b.DateObserved)).map((row, idx) => (
                    <tr key={idx}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {row.DateObserved}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.HourObserved}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.LocalTimeZone}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.ReportingArea}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.StateCode}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.Latitude}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.Longitude}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.ParameterName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.AQI}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoricalView;
