import React, {useContext} from "react";

import { CustomDateContext } from "../context";
import SearchPanel from "./SearchPanel";

export default function CustomDateRange() {
  const customDateContext = useContext(CustomDateContext);
  const historicals = customDateContext.rows;

  return (
    <>
      <SearchPanel customDate={true} context={customDateContext}/>
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
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
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
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{row.Category.Name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}