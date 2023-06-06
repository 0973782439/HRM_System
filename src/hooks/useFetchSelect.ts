import { useState, useEffect } from "react";
import http from "../utils/http";

const useFetchSelect = (url: string) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = () => {
      try {
        const json = http.get(url);
        json.then((res: any) => {
          setData(res.data.data);
        });
      } catch (error) {}
    };

    fetchData();
  }, []);

  return [data, setData];
};

export default useFetchSelect;
