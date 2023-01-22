import { Box, Image, Text, Stack, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { BlockChainContext } from "../context/blockChainContext";

const Bike = (props) => {
  const { checkOut } = useContext(BlockChainContext);
  const onSubmit = async () => {
    // const { payment } = values;
    await checkOut(props.price);
  };
  return (
    <Box boxSize="md" mx={10}>
      <Image
        src={props.image}
        mb={"-40px"}
        boxSize="400px"
        objectFit={"contain"}
      />
      <Text fontFamily={"sans-serif"}>{props.name}</Text>
      <Text fontFamily={"sans-serif"}>{props.price}</Text>
      <Stack
        spacing={0}
        mt={"10px"}
        direction={"row"}
        align={"center"}
        justify={"center"}
      >
        <Button
          onClick={onSubmit}
          colorScheme={"teal"}
          bg={"teal.400"}
          margin="5px"
          rounded={"full"}
          px={6}
          _hover={{
            bg: "teal.500",
          }}
        >
          Buy Now
        </Button>
      </Stack>
    </Box>
  );
};

export default Bike;
