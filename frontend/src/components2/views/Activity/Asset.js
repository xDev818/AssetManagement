/* 

    Date : 10 / 20 / 23
    Author : Nole
    Activities
    Purpose : 
        New Asset.js

    Date : 10 / 21 / 23
    Author : Nole
    Activities
    Purpose : 
        Added
          import DatePicker from 'react-datepicker'
          import 'react-datepicker/dist/react-datepicker.css'

    Date : 10 / 21 / 23
    Author : Nole
    Activities
    Purpose : 
         Update :
          Remove Asset Category and change to Asset Type

*/

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
  Checkbox,
  useToast
} from "@chakra-ui/react";
import Card from "components/Card/Card";

import { useLocation, Link } from "react-router-dom";
import Logs from "components/Utils/logs_helper";
import React, { useEffect, useState, useReducer, useRef } from "react";
import axios from "axios";
import decoder from "jwt-decode";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Asset() {
  //Nole

  const toast = useToast()

  var imgFilename = "";
  const [userdata, setUser] = useState({
    userID: "",
  });

  const [assettype, setAssetType] = useState([]);
  const [status, setStatus] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [date_purchase, setDatePurchase] = useState("");
  const [date_depreciated, setDateDepreciated] = useState("");

  const [values, setAssets] = useState({
    asset_id: "",
    asset_typeid: "",
    asset_statusid: "",
    asset_supplierid: "",
    asset_serialno: "",
    asset_code: "",
    asset_name: "",
    asset_description: "",
    asset_purchase_amout: "",
    asset_purchase_date: new Date(),
    assset_depreciated_amount: "",
    asset_depreciated_date: new Date(),
  });

  const location = useLocation();
  console.log("loc", location);
  const asset_ID = location.state?.assetID;
  const [btnstate, setbtnState] = useState();

  const SetUsers = async () => {
    const tokenStorage = localStorage.getItem("token");
    const tokenDecoded = decoder(tokenStorage);

    setUser({
      ...userdata,

      userID: tokenDecoded.result[0].userDisplayID,
    });
  };

  useEffect(() => {
    SetUsers();
    LoadAllAssetType();
    LoadAllStatus();
    LoadAllSuppliers();

    if (asset_ID) {
      axios
        .get("/asset/getAssetByID/" + asset_ID)
        .then((res) => {
          setbtnState("Update");
          setAssets({
            ...values,
            asset_id: res.data.result[0].id,
            asset_typeid: res.data.result[0].typeID,
            asset_statusid: res.data.result[0].assetStatusID,
            asset_supplierid: res.data.result[0].supplierid,
            asset_serialno: res.data.result[0].serialNo,
            asset_code: res.data.result[0].assetCode,
            asset_name: res.data.result[0].assetName,
            asset_description: res.data.result[0].description,
            asset_purchase_amout: res.data.result[0].Amount,
            asset_purchase_date: new Date(res.data.result[0].date_purchase),
            assset_depreciated_amount: res.data.result[0].AmountYR,
            asset_depreciated_date: new Date(
              res.data.result[0].date_depreciated
            ),
          });

          setDatePurchase(values.asset_purchase_date);
          setDateDepreciated(values.asset_depreciated_date);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      setbtnState("Save");

      setAssets({
        ...values,
        asset_id: "",
        asset_typeid: "",
        asset_statusid: "",
        asset_supplierid: "",
        asset_serialno: "",
        asset_code: "",
        asset_name: "",
        asset_description: "",
        asset_purchase_amout: "",
        asset_purchase_date: date_purchase,
        assset_depreciated_amount: "",
        asset_depreciated_date: date_depreciated,
      });

      setDatePurchase(values.asset_purchase_date);
      setDateDepreciated(values.asset_depreciated_date);
    }
  }, []);


  const LoadAllAssetType = async () => {
    try {
      const success = await axios
        .get("/assettype/viewasset-type")

        .then((res) => {
          setAssetType(res.data.result);
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userID
          );
        });
    } catch (err) {
      alert(err);
    }
  };

  const LoadAllStatus = async () => {
    try {
      const success = await axios
        .get("/getallStatus")
        //axios.get('/getViewallStatus')
        .then((res) => {
          setStatus(res.data.result);
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "Asset Status Viewer",
            "Function /LoadAllStatus",
            "LoadAllStatus",
            userdata.userID
          );
        });
    } catch (err) {
      alert(err);
    }
  };

  const LoadAllSuppliers = async () => {
    try {
      const success = await axios
        .get("/suppliers/viewallsuppliers")

        .then((res) => {
          setVendors(res.data.result);
        })
        .catch((err) => {
          const InsertLogs = new Logs(
            "Error",
            "PositionViewer",
            "Function /LoadAllPositions",
            "LoadAllPositions",
            userdata.userID
          );
        });
    } catch (err) {
      alert(err);
    }
  };

  function viewToastify(title,desc,status) {
    // const toast = useToast()
     return (
       
           toast({
             title: title,
             description: desc,
             status: status,
             duration: 2000,
             isClosable: true,
             position: "top"
           })
       
      
     )
   }


  async function handleUpdate(event) {
    try {
      event.preventDefault();

      const assetvalues = {
        asset_id: values.asset_id,
        asset_typeid: values.asset_typeid,
        asset_statusid: values.asset_statusid,
        asset_supplierid: values.asset_supplierid,
        asset_serialno: values.asset_serialno,
        asset_code: values.asset_code,
        asset_name: values.asset_name,
        asset_description: values.asset_description,
        asset_purchase_amout: values.asset_purchase_amout,
        asset_purchase_date: date_purchase,
        //values.asset_purchase_date,
        assset_depreciated_amount: values.assset_depreciated_amount,
        asset_depreciated_date: date_depreciated,
        //values.asset_depreciated_date
      };

      if (assetvalues.asset_id === "") {
        // insert here
        const success = await axios
          .post("/asset/create-AssetByID", assetvalues)
          .then((res) => {
           
            viewToastify (
              "Asset",
              " New Asset created succesfully",
              "success"
              )
            const InsertLogs = new Logs(
              "Info",
              "Asset Status",
              "Function /handleUpdate",
              " Create   Statusname :  " + values.asset_id,
              userdata.userID
            );

            // const request = axios.post('/log',InsertLogs.getLogs())
            // const response =  request.data

            window.location.href = "/#/admin/asset-viewer";
          })
          .catch((err) => {
            alert(err);
          });
      } else if (!assetvalues.asset_typeid == "") {
        /// update here
        const success = await axios
          .post("/asset/update-AssetByID", assetvalues)
          .then((res) => {
            viewToastify (
              "Asset",
              " Asset updated succesfully",
              "success"
              )

            const InsertLogs = new Logs(
              "Info",
              "Asset Status",
              "Function /handleUpdate",
              " Update StatusID : " +
                assetvalues.asset_id +
                " Statusname :  " +
                assetvalues.asset_name,
              userdata.userID
            );

            //  const request = axios.post('/log',InsertLogs.getLogs())
            //  const response =  request.data

            window.location.href = "/#/admin/asset-viewer";
          })
          .catch((err) => {
            const errorStatus = err.code;

            if (errorStatus.includes("ERR_NETWORK")) {
              const submitLogs = new Logs(
                "DB",
                "AssetStatus",
                "Function /HandleSubmit",
                err,
                userdata.userID
              );

              alert(submitLogs.getMessage());
            } else if (errorStatus.includes("ERR_BAD_REQUEST")) {
              const submitLogs = new Logs(
                "Error",
                "Asset Status",
                "Function /HandleSubmit",
                err.response.data.message,
                userdata.userID
              );

              try {
                const request = axios.post("/log", submitLogs.getLogs());
                const response = request.data;
                console.log(response);
              } catch (err) {
                console.log(err);
                const logStatus = err.code;

                if (logStatus.includes("ERR_NETWOR")) {
                  const submitLogs = new Logs(
                    "DB",
                    "Asset Status",
                    "Function /HandleSubmit",
                    err,
                    userdata.userID
                  );

                  alert(submitLogs.getMessage());
                  console.log(submitLogs.getLogs());
                }

                if (logStatus.includes("ERR_BAD_REQUEST")) {
                  const submitLogs = new Logs(
                    "Error",
                    "Asset Status",
                    "Function /HandleSubmit",
                    err.response.data.message,
                    userdata.userID
                  );

                  alert(submitLogs.getMessage());
                  console.log(submitLogs.getLogs());
                }
              }
            }
          });
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <Card
        w={{ base: "auto", md: "auto", lg: "auto" }}
        mx={{ base: 0, md: 0, lg: 3 }}
      >
        <Text fontWeight="bold" mb={5}>
          Asset
        </Text>
        <FormControl>
          <Stack gap={2} mt={10}>
            <Grid
              templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
              gap={3}
            >
              <GridItem>
                <FormLabel fontSize={{ base: "sm" }}>Category </FormLabel>
                <Select
                  id="asset_typeid"
                  placeholder="Select Type"
                  size="md"
                  onChange={(e) => {
                    setAssets({ ...values, asset_typeid: e.target.value });
                  }}
                  value={values.asset_typeid}
                >
                  {assettype.map((type) => (
                    <option value={type.id} size="md">
                      {type.typeName}
                    </option>
                  ))}
                </Select>

                <FormLabel>Status: </FormLabel>

                <Select
                  id="asset_statusid"
                  placeholder="Select Status"
                  size="md"
                  onChange={(e) => {
                    setAssets({ ...values, asset_statusid: e.target.value });
                  }}
                  value={values.asset_statusid}
                >
                  {status.map((stat) => (
                    <option value={stat.assetStatusID} size="md">
                      {stat.statusName}
                    </option>
                  ))}
                </Select>

                <FormLabel>Supplier: </FormLabel>

                <Select
                  id="asset_supplierid"
                  placeholder="Select Supplier"
                  size="md"
                  onChange={(e) => {
                    setAssets({ ...values, asset_supplierid: e.target.value });
                  }}
                  value={values.asset_supplierid}
                >
                  {vendors.map((vendor) => (
                    <option value={vendor.id} size="md">
                      {vendor.supplierName}
                    </option>
                  ))}
                </Select>
              </GridItem>
              <GridItem>
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
                    <Image
                      src={
                        imgFilename ||
                        "https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg"
                      }
                      w={{ base: 100 }}
                    />
                  </Box>
                  <input type="file" mt={4} />
                </Flex>
              </GridItem>
            </Grid>

            <Grid
              templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
              gap={5}
            >
              <GridItem>
                <FormLabel fontSize={{ base: "sm" }}>Serial No</FormLabel>
                <Input
                  type="text"
                  value={values.asset_serialno}
                  onChange={(e) => {
                    setAssets({ ...values, asset_serialno: e.target.value });
                  }}
                />
              </GridItem>
              <GridItem>
                <FormLabel fontSize={{ base: "sm" }}>Asset Code</FormLabel>
                <Input
                  type="text"
                  value={values.asset_code}
                  onChange={(e) => {
                    setAssets({ ...values, asset_code: e.target.value });
                  }}
                />
              </GridItem>
              <GridItem>
                <FormLabel fontSize={{ base: "sm" }}>Asset Name</FormLabel>
                <Input
                  type="text"
                  value={values.asset_name}
                  onChange={(e) => {
                    setAssets({ ...values, asset_name: e.target.value });
                  }}
                />
              </GridItem>
              <GridItem>
                <FormLabel fontSize={{ base: "sm" }}>Description</FormLabel>
                <Input
                  type="text"
                  value={values.asset_description}
                  onChange={(e) => {
                    setAssets({ ...values, asset_description: e.target.value });
                  }}
                />
              </GridItem>
              <GridItem>
                <FormLabel fontSize={{ base: "sm" }}>Date Purchase</FormLabel>
                {/* <Input
                  type="date"
                  onChange={(date_purchase) => setDatePurchase(date_purchase)}
                  value={date_purchase}
                /> */}
                <DatePicker
                  selected={date_purchase}
                  showIcon
                  onChange={(date_purchase) => setDatePurchase(date_purchase)}
                  value={date_purchase}
                />

                {/* 
             onChange={(date) => setDate(date)}
            <Input type="text" value={values.asset_purchase_date}
            onChange={ e => {
              setAssets( { ...values, asset_purchase_date: e.target.value } )}}
            />
   */}
              </GridItem>
              <GridItem>
                <FormLabel fontSize={{ base: "sm" }}>Purchase Amunt</FormLabel>
                <Input
                  type="text"
                  value={values.asset_purchase_amout}
                  onChange={(e) => {
                    setAssets({
                      ...values,
                      asset_purchase_amout: e.target.value,
                    });
                  }}
                />
              </GridItem>
              <GridItem>
                <FormLabel fontSize={{ base: "sm" }}>
                  Depreciation Date
                </FormLabel>
                <Box>
                  <DatePicker
                    w="100%"
                    selected={date_depreciated}
                    showIcon
                    onChange={(date_depreciated) =>
                      setDateDepreciated(date_depreciated)
                    }
                    value={date_depreciated}
                  />
                </Box>
                {/* <Input type="text" value={values.asset_depreciated_date}
            onChange={ e => {
              setAssets( { ...values, asset_depreciated_date: e.target.value } )}}
            />
   */}
              </GridItem>
              <GridItem>
                <FormLabel fontSize={{ base: "sm" }}>
                  Amount Depreciation
                </FormLabel>

                <Input
                  type="text"
                  value={values.assset_depreciated_amount}
                  onChange={(e) => {
                    setAssets({
                      ...values,
                      assset_depreciated_amount: e.target.value,
                    });
                  }}
                />
              </GridItem>
            </Grid>
            
            <Box>
              <Checkbox colorScheme='green' defaultChecked>
                  Active
              </Checkbox>
            </Box>

            <Box>
              <Button colorScheme="green" onClick={handleUpdate}>
                {" "}
                {btnstate}{" "}
              </Button>
            </Box>
          </Stack>
        </FormControl>
      </Card>
    </>
  );
}
