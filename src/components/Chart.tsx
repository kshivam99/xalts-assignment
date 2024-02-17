import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import usePreferences, { CoinPreferences } from "../hooks/usePreferences";
import useSelectedSymbol from "../hooks/useSymbol";
import useTokenPriceData from "../hooks/useTokenPriceData";
import { Checkbox, Flex, Select, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface Option {
  label: string;
  value: string;
}

interface ChartProps {
  tokens: Option[];
}

const Chart: React.FC<ChartProps> = ({ tokens }) => {
  const [symbol, setSelectedSymbol] = useSelectedSymbol(tokens[0]);
  const { data, loading, error } = useTokenPriceData(symbol.value);
  const { preferences, savePreferences } = usePreferences();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const handlePreferenceChange = (preference: keyof CoinPreferences) => {
    const newPreferences = {
      ...preferences[symbol.value],
      [preference]: !preferences[symbol.value][preference],
    };
    savePreferences(symbol.value, newPreferences);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Flex direction={"column"}>
      <Flex gap="md" direction="row" align="center" mb={"50px"}>
        <Flex
          gap="md"
          align="flex-start"
          ml={"10px"}
          direction={isSmallScreen ? "column" : "row"}
        >
          <Select
            label="Select Token"
            data={tokens}
            value={symbol.value}
            onChange={(_value, option) => setSelectedSymbol(option)}
          />
          <Flex
            direction={isSmallScreen ? "column" : "row"}
            gap="xl"
            justify="space-evenly"
            mt={isSmallScreen ? 0 : "30px"}
            ml={isSmallScreen ? 0 : "40px"}
          >
            <Checkbox
              checked={preferences[symbol.value]?.open}
              onChange={() => handlePreferenceChange("open")}
              label="Open"
            />
            <Checkbox
              checked={preferences[symbol.value]?.close}
              onChange={() => handlePreferenceChange("close")}
              label="Close"
            />
            <Checkbox
              checked={preferences[symbol.value]?.low}
              onChange={() => handlePreferenceChange("low")}
              label="Low"
            />
            <Checkbox
              checked={preferences[symbol.value]?.high}
              onChange={() => handlePreferenceChange("high")}
              label="High"
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex mb={30}>
        <Text size={"lg"} fw={600}>
          {symbol.label} Price Chart
        </Text>
      </Flex>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart width={800} height={400} data={data[symbol.value]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip />
          <Legend />
          {preferences[symbol.value].open && (
            <Line type="monotone" dataKey="open" stroke="#8884d8" />
          )}
          {preferences[symbol.value].high && (
            <Line type="monotone" dataKey="high" stroke="#82ca9d" />
          )}
          {preferences[symbol.value].low && (
            <Line type="monotone" dataKey="low" stroke="#ffc658" />
          )}
          {preferences[symbol.value].close && (
            <Line type="monotone" dataKey="close" stroke="#ff7300" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default Chart;
