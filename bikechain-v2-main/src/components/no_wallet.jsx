import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";

export default function NoWallet() {
  const redirect = () => {
    window.location.replace("https://metamask.io/download/", "_blank");
  };
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={400}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Oops! <br />
            <Text as={"span"} color={"blue.400"}>
              MetaMask not found.
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            This DApp needs an active MetaMask wallet connection to function.
            Please install/enable MetaMask and try again.
          </Text>
          <Stack
            direction={"column"}
            spacing={10}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"teal"}
              bg={"teal.400"}
              rounded={"full"}
              px={6}
              mt={"20px"}
              _hover={{
                bg: "teal.500",
              }}
              onClick={redirect}
            >
              Get MetaMask
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
