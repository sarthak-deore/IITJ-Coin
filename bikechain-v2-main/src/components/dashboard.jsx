import { Stack, Box, Flex, Center } from "@chakra-ui/react";
import CurrentTotals from "./currentTotals";
import RenterForm from "./renterForm";
import { useContext } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import { BlockChainContext } from "../context/blockChainContext";
import { useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";
import { queryAllByAltText } from "@testing-library/react";

const Dashboard = () => {
  const { renterExists, currentAccount } = useContext(BlockChainContext);

  let [loading, setLoading] = useState(true);

  let [products, getproducts] = useState([]);

  // get products from firebase
  // useEffect(() => {
  //   const q = query(collection(db, "Products"));
  //   onSnapshot(q, (querySnapshot) => {
  //     getproducts(
  //       querySnapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //       }))
  //     );
  //     console.log("sadasdASS");
  //     console.log(products);
  //   });
  // }, []);
  // return <CurrentTotals />;
  return (
    <Stack
      as={Box}
      textAlign={"center"}
      spacing={{ base: 8, md: 14 }}
      py={{ base: 20, md: 36 }}
    >
      {renterExists && currentAccount ? <CurrentTotals /> : <RenterForm />}
      {/* <Flex justifyContent={"center"} alignItems={"center"}>
        <Bike bike={Bike1}></Bike>
        <Bike bike={Bike2}></Bike>
        <Bike bike={Bike3}></Bike>
      </Flex> */}
    </Stack>
  );
};

export default Dashboard;
