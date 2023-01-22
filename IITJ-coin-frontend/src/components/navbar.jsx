import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { BlockChainContext } from "../context/blockChainContext";

import { useContext } from "react";

export default function Navbar() {
  let navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };
  const { connectWallet, currentAccount } = useContext(BlockChainContext);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("gray.200", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            fontWeight={800}
            fontSize={"x-large"}
            onClick={() => handleClick("dashboard")}
          >
            IITJ Coin
          </Link>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            onClick={
              !currentAccount
                ? () => handleClick("")
                : () => handleClick("redeem")
            }
            display={{ md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"purple.500"}
            href={"#"}
            _hover={{
              bg: "teal.300",
            }}
          >
            Redeem Tokens
          </Button>

          <Button
            onClick={
              !currentAccount ? connectWallet : () => handleClick("account")
            }
            display={{ md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"teal.500"}
            href={"#"}
            _hover={{
              bg: "teal.300",
            }}
          >
            {!currentAccount ? "Connect Wallet" : "My Account"}
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
