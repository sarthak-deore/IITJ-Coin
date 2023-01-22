import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

export default function AddProducts() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    // const { creditBalance } = values;
    // await deposit(creditBalance);
    // console.log(JSON.stringify(values));
    const { productName, price } = values;
    const docRef = await addDoc(collection(db, "Products"), {
        productName: productName,
        price: price,
        createdAt: Timestamp.fromDate(new Date()),
    });
    // console.log("Document written with ID: ", docRef.id);
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
          Add a new product
        </Text>
        <FormControl isInvalid={errors.productName}>
          <Input
            id="productName"
            type="text"
            step="any"
            placeholder="Product Name"
            {...register("productName", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.price && errors.price.message}
          </FormErrorMessage>

          <Input
            id="price"
            type="number"
            step="any"
            placeholder="Price for the product"
            {...register("price", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.price && errors.price.message}
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


