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

export default function AddBalanceForm() {
  const { deposit } = useContext(BlockChainContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    const { creditBalance } = values;
    await deposit(creditBalance);
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
          Credit Your Account
        </Text>
        <FormControl isInvalid={errors.creditBalance}>
          <Input
            id="creditBalance"
            type="number"
            step="any"
            placeholder="Credit Balance"
            {...register("creditBalance", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.creditBalance && errors.CreditBalance.message}
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
