import moment from "moment";
import { PriceData } from "../hooks/useTokenPriceData";

export const timestampToFullDate = (timestamp: number) => {
  const formattedDate = moment(timestamp).format("DD MMM, YYYY");
  return formattedDate;
};

export const clubPriceToDaily = (dataArray: PriceData[]) => {
  const groupedData: Record<number, PriceData> = {};
  dataArray.forEach((item) => {
    if (!groupedData[Number(item.time)]) {
      groupedData[Number(item.time)] = {
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        time: 0,
      };
    } else {
      groupedData[Number(item.time)].high = Math.max(
        groupedData[Number(item.time)].high,
        item.high
      );
      groupedData[Number(item.time)].low = Math.min(
        groupedData[Number(item.time)].low,
        item.low
      );
      groupedData[Number(item.time)].close = item.close;
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
