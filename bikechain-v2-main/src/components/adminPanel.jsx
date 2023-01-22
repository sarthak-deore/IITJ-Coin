import { Stack, Box, Flex, Text, Center, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { BlockChainContext } from "../context/blockChainContext";
import { useState } from "react";
import { useForm } from "react-hook-form";

import AdminTotals from "./adminTotals";

import ClipLoader from "react-spinners/ClipLoader";

const AdminPanel = () => {
  const { renterExists, currentAccount, checkOwner, isOwner } =
    useContext(BlockChainContext);

  let [loading, setLoading] = useState(true);

  checkOwner();

  const {
    formState: { errors, isSubmitting },
  } = useForm();

  const redirect = () => {
    window.location.replace(
      "https://www.youtube.com/watch?v=9SklO4OFEJI",
      "_blank"
    );
  };

  return (
    <Stack
      as={Box}
      textAlign={"center"}
      spacing={{ base: 8, md: 14 }}
      py={{ base: 20, md: 36 }}
    >
      {renterExists == null && currentAccount ? (
        <Center>
          <ClipLoader loading={loading} size={75} />
        </Center>
      ) : isOwner ? (
        <AdminTotals />
      ) : (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          p={5}
          mt={10}
          display={"block"}
        >
          <Text fontSize={30} fontWeight={500} padding={1}>
            Are you sure about that?
          </Text>

          <Button
            mt={4}
            colorScheme="orange"
            isLoading={isSubmitting}
            onClick={redirect}
          >
            Yes, I'm sure!
          </Button>
        </Flex>
      )}
    </Stack>
  );
};

export default AdminPanel;
