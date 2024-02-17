import { useState } from "react";

export interface Option {
  value: string;
  label: string;
}

const useSelectedSymbol = (defaultValue: Option): [
  Option,
  React.Dispatch<React.SetStateAction<Option>>
] => {
  const [selectedSymbol, setSelectedSymbol] = useState<Option>(defaultValue);

  return [selectedSymbol, setSelectedSymbol];
};

export default useSelectedSymbol;
