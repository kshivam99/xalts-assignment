import axios from "axios";
import { useState, useEffect } from "react";
import { clubPriceToDaily, timestampToFullDate } from "../utils";

export interface PriceData {
  time: number | string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const useTokenPriceData = (symbol: string) => {
  const [data, setData] = useState<Record<string, PriceData[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${symbol.toLowerCase()}/ohlc?vs_currency=usd&days=30`
        );
        if (response.data && response.data.length > 0) {
          const processedData: PriceData[] = [];
          response.data.forEach((dt: number[]) => {
            processedData.push({
              time: timestampToFullDate(dt[0]),
              open: dt[1],
              high: dt[2],
              low: dt[3],
              close: dt[4],
            });
          });
          setData((prev) => ({
            ...prev,
            [symbol]: clubPriceToDaily(processedData),
          }));
        }
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    if (!data[symbol]) {
      fetchData();
    }
  }, [symbol]);

  return { data, loading, error };
};

export default useTokenPriceData;
