import { useEffect, useState } from "react";
import axios from "axios";

export const useCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://amazon-api.sellead.com/country/")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return {
    countries,
  };
};
