// Chakra imports
import { Box, Button, Flex, Text } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";

import FourGraphs from "components/FourGraphs/FourGraphs";

import React from "react";

export default function Users() {
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <FourGraphs />
      <Card>
        <Box height={400}>
          <Text>Asset</Text>
        </Box>
      </Card>
    </Flex>
  );
}
