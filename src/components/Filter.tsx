import React from "react";
import { Box, Checkbox, Flex, Select } from "@mantine/core";
import useSelectedSymbol from "../hooks/useSymbol";
import { useMediaQuery } from "@mantine/hooks";
import usePreferences, { CoinPreferences } from "../hooks/usePreferences";

const OPTIONS = [
  { value: "bitcoin", label: "Bitcoin" },
  { value: "ethereum", label: "Ethereum" },
  { value: "solana", label: "Solana" },
];

function Filter() {
  const [symbol, setSelectedSymbol] = useSelectedSymbol();
  const { preferences, savePreferences } = usePreferences();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const handlePreferenceChange = (preference: keyof CoinPreferences) => {
    const newPreferences = {
      ...preferences[symbol.value],
      [preference]: !preferences[symbol.value][preference],
    };
    savePreferences(symbol.value, newPreferences);
  };

  return (
    <Flex
      gap="md"
      align="flex-start"
      ml={"10px"}
      direction={isSmallScreen ? "column" : "row"}
    >
      <Select
        label="Select Token"
        data={OPTIONS}
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
          checked={preferences[symbol.value]?.open}
          onChange={() => handlePreferenceChange("close")}
          label="Close"
        />
        <Checkbox
          checked={preferences[symbol.value]?.open}
          onChange={() => handlePreferenceChange("low")}
          label="Low"
        />
        <Checkbox
          checked={preferences[symbol.value]?.open}
          onChange={() => handlePreferenceChange("high")}
          label="High"
        />
      </Flex>
    </Flex>
  );
}

export default Filter;
