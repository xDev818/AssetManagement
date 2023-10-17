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
import React, { useEffect, useState } from "react";
import decoder from "jwt-decode";

export default function UpdateProfile() {
  const [data, setData] = useState();
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    setData(decoder(token));
  }, []);

  // Destructuring personal info
  const displayName = data?.result[0].displayName;
  const department = data?.result[0].departmentName;
  const email = data?.result[0].email;
  const userRole = data?.result[0].userRole;
  const profileImage = data?.result[0].imgFilename;

  console.log(profileImage);

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
          <Box
            borderRadius="100%"
            bg="blackAlpha.100"
            w={150}
            h={150}
            overflow="hidden"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {profileImage ? (
              <Image
                src={`http://localhost:5001/${profileImage}`}
                w={{ base: 100 }}
              />
            ) : (
              <Image src="https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg" />
            )}
          </Box>
          <input type="file" mt={4} />
        </Flex>
        <Stack gap={2} mt={10}>
          <FormLabel>Position: {userRole}</FormLabel>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Department</FormLabel>
            <Select placeholder={department}>
              <option value="option1">IT</option>
              <option value="option2">Admin</option>
              <option value="option3">Support Desk</option>
            </Select>
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem>
              <FormLabel fontSize={{ base: "sm" }}>First Name</FormLabel>
              <Input value={displayName} />
            </GridItem>
            <GridItem>
              <FormLabel fontSize={{ base: "sm" }}>Last Name</FormLabel>
              <Input value={displayName} />
            </GridItem>
          </Grid>
          <Box>
            <FormLabel fontSize={{ base: "sm" }}>Email Address</FormLabel>
            <Input value={email} />
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
            <Button colorScheme="green">Update Profile</Button>
          </Box>
        </Stack>
      </FormControl>
    </Card>
  );
}
