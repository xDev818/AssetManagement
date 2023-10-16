import {
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import IconBox from "components/Icons/IconBox";
import React from "react";
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";

export default function FourGraphs() {
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, xl: 4 }}
      spacing="24px"
      mb="20px"
      display={{ base: "none", md: "grid" }}
    >
      <Card minH="125px">
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="25px"
          >
            <Stat me="auto">
              <StatLabel
                fontSize="xs"
                color="gray.400"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Today's Money
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                  $53,897
                </StatNumber>
              </Flex>
            </Stat>
            <IconBox
              borderRadius="50%"
              as="box"
              h={"45px"}
              w={"45px"}
              bg={iconBlue}
            >
              <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
            </IconBox>
          </Flex>
          <Text color="gray.400" fontSize="sm">
            <Text as="span" color="green.400" fontWeight="bold">
              +3.48%{" "}
            </Text>
            Since last month
          </Text>
        </Flex>
      </Card>
      <Card minH="125px">
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="25px"
          >
            <Stat me="auto">
              <StatLabel
                fontSize="xs"
                color="gray.400"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Today's Users
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                  $3,200
                </StatNumber>
              </Flex>
            </Stat>
            <IconBox
              borderRadius="50%"
              as="box"
              h={"45px"}
              w={"45px"}
              bg={iconBlue}
            >
              <GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />
            </IconBox>
          </Flex>
          <Text color="gray.400" fontSize="sm">
            <Text as="span" color="green.400" fontWeight="bold">
              +5.2%{" "}
            </Text>
            Since last month
          </Text>
        </Flex>
      </Card>
      <Card minH="125px">
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="25px"
          >
            <Stat me="auto">
              <StatLabel
                fontSize="xs"
                color="gray.400"
                fontWeight="bold"
                textTransform="uppercase"
              >
                New Clients
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                  +2,503
                </StatNumber>
              </Flex>
            </Stat>
            <IconBox
              borderRadius="50%"
              as="box"
              h={"45px"}
              w={"45px"}
              bg={iconBlue}
            >
              <DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />
            </IconBox>
          </Flex>
          <Text color="gray.400" fontSize="sm">
            <Text as="span" color="red.500" fontWeight="bold">
              -2.82%{" "}
            </Text>
            Since last month
          </Text>
        </Flex>
      </Card>
      <Card minH="125px">
        <Flex direction="column">
          <Flex
            flexDirection="row"
            align="center"
            justify="center"
            w="100%"
            mb="25px"
          >
            <Stat me="auto">
              <StatLabel
                fontSize="xs"
                color="gray.400"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Total Sales
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                  $173,000
                </StatNumber>
              </Flex>
            </Stat>
            <IconBox
              borderRadius="50%"
              as="box"
              h={"45px"}
              w={"45px"}
              bg={iconBlue}
            >
              <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
            </IconBox>
          </Flex>
          <Text color="gray.400" fontSize="sm">
            <Text as="span" color="green.400" fontWeight="bold">
              +8.12%{" "}
            </Text>
            Since last month
          </Text>
        </Flex>
      </Card>
    </SimpleGrid>
  );
}
