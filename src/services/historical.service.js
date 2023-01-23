import axios from "axios";
import config from "../config";

const get = (zipCode, distance, date, onSuccess, onError) => {
  axios.get(config.airnowapiURL, {params: {zipCode, date, distance: distance ? distance : 25, API_KEY: config.APIKey}})
  .then((res)=>{
    if ( onSuccess ) onSuccess(res.data);
  })
  .catch((err) => {
    if ( onError ) onError(err);
  })
}

const HistoricalApi = {
  get
}

export default HistoricalApi;