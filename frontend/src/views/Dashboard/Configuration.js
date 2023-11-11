// Chakra imports
import { Box, Button, Flex, Text } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";

import FourGraphs from "components/FourGraphs/FourGraphs";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import React from "react";
//import AssetCategory from "components2/Configuration/AssetCategory";
//import PositionCategory from "components2/Configuration/PositionCategory";
//import StatusCategory from "components2/Configuration/StatusCategory";


export default function Configuration() {
  // Chakra Color Mode

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      {/* <FourGraphs /> */}
      <Card>
        <Tabs>
          <TabList>
            <Tab>Asset Category</Tab>
            <Tab>User Group</Tab>
            <Tab>Status</Tab>
            <Tab>Department</Tab>
            <Tab>Position</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text mb={5}>Asset Category</Text>
              {/* <AssetCategory /> */}
            </TabPanel>
            <TabPanel>
              <Text>User Group</Text>
            </TabPanel>
            <TabPanel>
              <Text>Status</Text>
              {/* <StatusCategory /> */}
            </TabPanel>
            <TabPanel>
              <Text>Department</Text>
            </TabPanel>
            <TabPanel>
              <Text>Position</Text>
              {/* <PositionCategory /> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Flex>
  );
}
