import React from "react";
import {
  Button,
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import React from "react";
import { pageVisits, socialTraffic } from "variables/general";

export default function SocialTraffics() {
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");
  return (
    <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
      <Flex direction="column">
        <Flex align="center" justify="space-between" p="22px">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Social traffic
          </Text>
          <Button variant="primary" maxH="30px">
            SEE ALL
          </Button>
        </Flex>
      </Flex>
      <Box overflow={{ sm: "scroll", lg: "hidden" }}>
        <Table>
          <Thead>
            <Tr bg={tableRowColor}>
              <Th color="gray.400" borderColor={borderColor}>
                Referral
              </Th>
              <Th color="gray.400" borderColor={borderColor}>
                Visitors
              </Th>
              <Th color="gray.400" borderColor={borderColor}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {socialTraffic.map((el, index, arr) => {
              return (
                <Tr key={index}>
                  <Td
                    color={textTableColor}
                    fontSize="sm"
                    fontWeight="bold"
                    borderColor={borderColor}
                    border={index === arr.length - 1 ? "none" : null}
                  >
                    {el.referral}
                  </Td>
                  <Td
                    color={textTableColor}
                    fontSize="sm"
                    borderColor={borderColor}
                    border={index === arr.length - 1 ? "none" : null}
                  >
                    {el.visitors}
                  </Td>
                  <Td
                    color={textTableColor}
                    fontSize="sm"
                    borderColor={borderColor}
                    border={index === arr.length - 1 ? "none" : null}
                  >
                    <Flex align="center">
                      <Text
                        color={textTableColor}
                        fontWeight="bold"
                        fontSize="sm"
                        me="12px"
                      >{`${el.percentage}%`}</Text>
                      <Progress
                        size="xs"
                        colorScheme={el.color}
                        value={el.percentage}
                        minW="120px"
                      />
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
