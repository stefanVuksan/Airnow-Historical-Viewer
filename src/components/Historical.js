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
  const getHistoricals = (days, parameter) => historicals.filter(h=>h.ParameterName==parameter).sort((a, b)=>new Date(a.DateObserved) - new Date(b.DateObserved)).slice(-days);
  const getCategories = (days, parameter) => getHistoricals(days, parameter)?.map((historical, idx)=>monthNames[new Date(historical.DateObserved).getMonth()] + ' ' + nth(new Date(historical.DateObserved).getDate()));
  const getValues = (days, parameter) => getHistoricals(days, parameter)?.map((historical, idx)=>historical.AQI);
  const getAverage = (days, parameter) => {
    let historicals = getHistoricals(days, parameter);
    let average = 0;
    historicals.forEach(h=>{
      average += h.AQI;
    })
    return Math.round(average/historicals.length);
  }

  const makeOptions = (period, parameter, tickAmount, average) => {
    console.log(average)
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
      annotations:{
        position: 'back',
        yaxis: [
          {
            y:average,
            y2: null,
            strokeDashArray: 1,
            borderColor: '#000',
            fillColor: '#000',
            // opacity: 0.3,
            offsetX: 0,
            // offsetY: -3,
            width: '100%',
            yAxisIndex: 0,
            label:{
              text: 'Average: ' + average,
              style:{
                color: '#000'
              }
            }
          }
        ]
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        markers: {
          fillColors: ['#00e400', '#ffff00', '#ff7e00', '#ff0000', '#8f3f97', '#7e0023'],
        },
        customLegendItems: [
          '0-50', '51-100', '101-150', '151-200', '201-300', '301-500'
        ]
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
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Historical View</h1>
          <p className="mt-2 text-sm text-gray-700">

          </p>
        </div>
      </div>
      <SearchPanel context={historicalContext} onComplete={(completed)=>setCompleted(completed)}/>
      {isCompleted && <div className="mt-8 flex flex-col">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {/* <div className="flex flex-col md:flex-row">
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
              </div> */}
            <div className="flex flex-col shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-10">
              <div className="flex flex-col md:flex-row">
                <div className="w-full p-4">
                  <Chart
                    options={makeOptions('Month', 'OZONE', 15, getAverage('Month', 'OZONE'))}
                    series={makeSeries('Month', 'OZONE')}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <div className="flex flex-col md:flex-row">
                <div className="w-full p-4">
                  <Chart
                    options={makeOptions('Month', 'PM2.5', 15, getAverage('Month', 'PM2.5'))}
                    series={makeSeries('Month', 'PM2.5')}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>
            </div>
          </div>
      </div>}
    </div>
  );
}