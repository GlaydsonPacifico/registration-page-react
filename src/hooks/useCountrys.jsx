import { useEffect, useState } from "react";
import axios from "axios";


export const useCountrys= () => {
  const [countrys, setCountrys] = useState([]);

  useEffect(() => {
    axios
      .get('https://amazon-api.sellead.com/country/')
      .then((res) => {
        setCountrys(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return {
    countrys
  };
}