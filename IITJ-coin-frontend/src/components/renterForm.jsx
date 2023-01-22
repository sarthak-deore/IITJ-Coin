import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Text,
  Flex,
  FormLabel,
} from "@chakra-ui/react";
import { useContext } from "react";
import { BlockChainContext } from "../context/blockChainContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RenterForm() {
  const { addRenter, currentAccount } = useContext(BlockChainContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    values["balance"] = 0;
    const newValuesObject = { walletAddress: currentAccount, ...values };
    const { walletAddress, firstName, lastName, roll, gradYear, balance } =
      newValuesObject;
    await addRenter(
      walletAddress,
      firstName,
      lastName,
      roll,
      gradYear,
      balance
    );
  };

  return (
    <>
      <Text fontFamily={"heading"} fontSize={"x-large"} fontWeight={600}>
        Welcome! <br /> Please enter your details to register.
      </Text>

      <Flex justifyContent={"center"} alignItems={"center"} p={5} mt={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.firstName && errors.lastName}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              id="firstName"
              placeholder="First Name"
              {...register("firstName", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.firstName && errors.firstName.message}
            </FormErrorMessage>

            <FormLabel htmlFor="lastName" mt={"8px"}>
              Last Name
            </FormLabel>
            <Input
              id="lastName"
              placeholder="Last Name"
              {...register("lastName", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.lastName && errors.lastName.message}
            </FormErrorMessage>

            <FormLabel htmlFor="roll" mt={"8px"}>
              Roll No.
            </FormLabel>
            <Input
              id="roll"
              placeholder="Roll No."
              {...register("roll", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.roll && errors.roll.message}
            </FormErrorMessage>

            <FormLabel htmlFor="gradYear" mt={"8px"}>
              Graduation Year
            </FormLabel>
            <Input
              id="gradYear"
              placeholder="Graduation Year"
              {...register("gradYear", {
                required: "This is required",
              })}
            />
            <FormErrorMessage>
              {errors.gradYear && errors.gradYear.message}
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
      <ToastContainer autoClose={3000} />
    </>
  );
}
