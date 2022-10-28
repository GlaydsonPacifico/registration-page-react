import { useEffect, useState } from "react";
import axios from "axios";

export const useCitys = (selectedCountry = null) => {
  const [citys, setCitys] = useState([]);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get("https://amazon-api.sellead.com/city/")
        .then((res) => {
					const filteredCities = res.data.filter((city) => city.country_code === selectedCountry);
          setCitys(filteredCities);
					console.log(filteredCities)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedCountry]);
	
  return { citys };
};
