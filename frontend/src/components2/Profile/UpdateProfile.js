import {
  Box,
  Flex,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
  Select,
  Button,
  FormControl,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import React from "react";

export default function UpdateProfile() {
  return (
    <Card
      w={{ base: "auto", md: "auto", lg: "auto" }}
      mx={{ base: 0, md: 0, lg: 3 }}
    >
      <Text fontWeight="bold" mb={5}>
        Profile
      </Text>
      <FormControl>
        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Image
            src="https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg"
            borderRadius="100%"
            w={{ base: 100 }}
          />
          <Input type="file" mt={4} />
        </Flex>
        <Stack gap={2} mt={10}>
          <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem>
              <FormLabel fontSize={{ base: "sm" }}>First Name</FormLabel>
              <Input value="John" />
            </GridItem>
            <GridItem>
              <FormLabel fontSize={{ base: "sm" }}>Last Name</FormLabel>
              <Input value="Cena" />
            </GridItem>
          </Grid>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Email Address</FormLabel>
            <Input />
          </Box>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Password</FormLabel>
            <Input type="password" value="carloe24!@" />
          </Box>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Confirm Password</FormLabel>
            <Input type="password" />
          </Box>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Department</FormLabel>
            <Select>
              <option value="option1">IT</option>
              <option value="option2">Admin</option>
              <option value="option3">Support Desk</option>
            </Select>
          </Box>
          <Box>
            <Button colorScheme="green">Update Profile</Button>
          </Box>
        </Stack>
      </FormControl>
    </Card>
  );
}
