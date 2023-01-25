import React, {useState, useContext} from "react";
import Chart from "react-apexcharts";

import { HistoricalContext } from "../context";
import SearchPanel from "./SearchPanel";

export default function Historical() {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const nth = (d) => {
    if (d > 3 && d < 21) return d + 'th';
    switch (d % 10) {
        case 1:  return d + "st";
        case 2:  return d + "nd";
        case 3:  return d + "rd";
        default: return d + "th";
    }
  };

  const historicalContext = useContext(HistoricalContext);
  const historicals = historicalContext.rows;
  const getHistoricals = (days, parameter) => historicals.filter(h=>h.ParameterName.indexOf(parameter)!==-1).sort((a, b)=>new Date(a.DateObserved) - new Date(b.DateObserved)).slice(-days);
  const getCategories = (days, parameter) => getHistoricals(days, parameter)?.map((historical, idx)=>monthNames[new Date(historical.DateObserved).getMonth()] + ' ' + nth(new Date(historical.DateObserved).getDate()));
  const getValues = (days, parameter) => getHistoricals(days, parameter)?.map((historical, idx)=>historical.AQI);

  const makeOptions = (period, parameter, tickAmount) => {
    return {
      title: {
        text: period + '(' + parameter + ')',
        align: 'center',
      },
      subtitle: {
        text: historicals.length > 0 ? historicals[0].ReportingArea + ' Reporting Area' : '',
        align: 'center',
      },
      xaxis: {
        tickAmount,
        categories: getCategories(period === 'Month' ? 30 : 7, parameter)
      },
      yaxis: {
        opposite: true,
        title: {
          text: 'Air Quality Index(AQI)'
        }
      },
      colors: [
        (param)=>{
          if ( param.value <= 50 ) return '#00e400';
          else if ( param.value <= 100 ) return '#ffff00';
          else if ( param.value <= 150 ) return '#ff7e00';
          else if ( param.value <= 200 ) return '#ff0000';
          else if ( param.value <= 300 ) return '#8f3f97';
          else return '#7e0023';
        }
      ]
    }
  }

  const makeSeries = (period, parameter) => {
    return [
      {
        name: parameter,
        data: getValues(period === 'Month' ? 30 : 7, parameter)
      }
    ]
  }

  const [isCompleted, setCompleted] = useState(false);

  return (
    <>
      <SearchPanel context={historicalContext} onComplete={(completed)=>setCompleted(completed)}/>
      {isCompleted && <div className="mt-8 flex flex-col">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="flex flex-col shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-2">
                  <Chart
                    options={makeOptions('Week', 'OZONE')}
                    series={makeSeries('Week', 'OZONE')}
                    type="bar"
                    height={350}
                  />
                </div>
                <div className="w-full md:w-1/2 p-4">
                  <Chart
                    options={makeOptions('Week', 'PM')}
                    series={makeSeries('Week', 'PM')}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full p-4">
                  <Chart
                    options={makeOptions('Month', 'OZONE', 15)}
                    series={makeSeries('Month', 'OZONE')}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="w-full p-4">
                  <Chart
                    options={makeOptions('Month', 'PM', 15)}
                    series={makeSeries('Month', 'PM')}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>
            </div>
          </div>
      </div>}
    </>
  );
}