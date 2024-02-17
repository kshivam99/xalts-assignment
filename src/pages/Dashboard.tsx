import { useState } from "react";
import { Container, Flex, Button } from "@mantine/core";
import Filter from "../components/Filter";

export function Dashboard() {

  return (
    <Container size={"responsive"}>
      <Flex gap="md" direction="row" align="center" mb={"50px"}>
        <Filter />
      </Flex>
    {/* <div>Chart</div> */}
    </Container>
  );
}
