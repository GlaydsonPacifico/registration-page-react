import { useEffect, useState } from "react";
import axios from "axios";

export const useCities = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
      axios
        .get("https://amazon-api.sellead.com/city/")
        .then((res) => {					
          setCities(res.data);
        })
        .catch((err) => {
          console.log(err);
        });    
  }, []);
	
  return { 
    cities
  };
};
