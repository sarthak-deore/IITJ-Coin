import { Stack, Box, Flex, Center } from "@chakra-ui/react";

import { useContext } from "react";
import tshirt from "../assets/tshirt.png";
import bag from "../assets/bag.png";
import wt from "../assets/wt.png";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Bike from "./bike";
import { BlockChainContext } from "../context/blockChainContext";
import { useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";
import { queryAllByAltText } from "@testing-library/react";

const Redeem = () => {
  const { renterExists, currentAccount } = useContext(BlockChainContext);

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
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Bike name="Hoodie" price="800" image={tshirt}></Bike>
        <Bike name="Bag" price="1000" image={bag}></Bike>
        <Bike name="T-Shirt" price="500" image={wt}></Bike>
      </Flex>
    </Stack>
  );
};

export default Redeem;
