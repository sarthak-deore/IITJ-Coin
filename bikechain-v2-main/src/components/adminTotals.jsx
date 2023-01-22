import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PayForm from "./payForm";
import AddBalanceForm from "./addBalanceForm";
import { useContext } from "react";
import { BlockChainContext } from "../context/blockChainContext";

function StatsCard(props) {
  const { title, stat, icon, bgcolor } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
      backgroundColor={bgcolor}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"}>{title}</StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function CurrentTotals() {
  const {
    renterBalance,
    renter,
    checkRenterExists,
    currentAccount,
    getRenter,
  } = useContext(BlockChainContext);
  const { makePayment } = useContext(BlockChainContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    // const { payment } = values;
    await makePayment(values);
    console.log(JSON.stringify(values));
  };

  if (currentAccount && renter) {
    checkRenterExists();
    getRenter();
    return (
      <>
        <Box maxW="7xl" mx={"auto"} pt={0} px={{ base: 2, sm: 12, md: 17 }}>
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
          >
            Welcome {renter.firstName}, Here are your stats!
          </chakra.h1>
          <SimpleGrid columns={1} spacing={{ base: 5, lg: 8 }}>
            <StatsCard
              title={"IITJ Coin Balance"}
              stat={renterBalance}
              icon={<MdOutlineAccountBalanceWallet size={"3em"} />}
            />
          </SimpleGrid>

          <Flex justifyContent={"center"} alignItems={"center"}>
            <Flex justifyContent={"center"} alignItems={"center"} p={5} mt={10}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Text
                  fontFamily={"heading"}
                  fontSize={"x-large"}
                  fontWeight={600}
                  mb={4}
                >
                  Transfer to any student's address
                </Text>
                <FormControl isInvalid={errors.payment}>
                  <Input
                    id="address"
                    type="text"
                    step="any"
                    placeholder={"Address"}
                    {...register("address", {
                      required: "This is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.address && errors.address.message}
                  </FormErrorMessage>
                  <Input
                    id="amount"
                    type="number"
                    step="any"
                    placeholder={"Amount"}
                    {...register("amount", {
                      required: "This is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.amount && errors.amount.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Flex>
          </Flex>
        </Box>
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}
