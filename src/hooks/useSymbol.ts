import { useState } from "react";

export interface Option {
  value: string;
  label: string;
}

const useSelectedSymbol = (): [
  Option,
  React.Dispatch<React.SetStateAction<Option>>
] => {
  const [selectedSymbol, setSelectedSymbol] = useState<Option>({
    value: "bitcoin",
    label: "Bitcoin",
  });

  return [selectedSymbol, setSelectedSymbol];
};

export default useSelectedSymbol;
