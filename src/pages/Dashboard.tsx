import React from "react";
import { Container } from "@mantine/core";
import Chart from "../components/Chart";

const OPTIONS = [
  { value: "bitcoin", label: "Bitcoin" },
  { value: "ethereum", label: "Ethereum" },
  { value: "solana", label: "Solana" },
];

export function Dashboard() {
  return (
    <Container size={"responsive"}>
      <Chart tokens={OPTIONS} />
    </Container>
  );
}
