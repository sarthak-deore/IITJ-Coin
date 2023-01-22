import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useContext } from "react";
import { BlockChainContext } from "../context/blockChainContext";

export default function PayForm() {
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

  return (
    <Flex justifyContent={"center"} alignItems={"center"} p={5} mt={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text
          fontFamily={"heading"}
          fontSize={"x-large"}
          fontWeight={600}
          mb={4}
        >
          Transfer to Your Friend's address
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
  );
}
