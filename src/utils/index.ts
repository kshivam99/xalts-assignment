import moment from "moment";
import { PriceData } from "../hooks/useTokenPriceData";

export const timestampToFullDate = (timestamp: number) => {
  const formattedDate = moment(timestamp).format("DD MMM, YYYY");
  return formattedDate;
};

export const clubPriceToDaily = (dataArray: PriceData[]) => {
  const groupedData: Record<string, PriceData> = {};
  dataArray.forEach((item) => {
    if (!groupedData[item.time]) {
      groupedData[item.time] = {
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        time: 0
      };
    } else {
      groupedData[item.time].high = Math.max(
        groupedData[item.time].high,
        item.high
      );
      groupedData[item.time].low = Math.min(
        groupedData[item.time].low,
        item.low
      );
      groupedData[item.time].close = item.close;
    }
  });

  const clubbedData = [];

  for (const time in groupedData) {
    clubbedData.push({
      time: time,
      open: groupedData[time].open,
      high: groupedData[time].high,
      low: groupedData[time].low,
      close: groupedData[time].close,
    });
  }

  return clubbedData;
};
