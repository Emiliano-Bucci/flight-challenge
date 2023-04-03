import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react";

function App() {
  return (
    <Flex flexDir="column" flex="1" justifyContent="flex-start">
      <Flex
        bg="white"
        p="8rem 4rem"
        borderBottom="1px solid #eee"
        justifyContent="center"
      >
        <Text fontSize="7xl" color="primary" fontWeight="bold">
          SmartSky
        </Text>
      </Flex>
      <Flex justifyContent="center">
        <Grid
          bg="white"
          p="4rem"
          w="100%"
          maxW="520px"
          borderRadius="16px"
          boxShadow="2px 5.5px 12px rgba(0, 0, 0, 0.01), 2px 16px 52px rgba(0, 0, 0, 0.088)"
          mt="-4.8rem"
          gap="2.4rem"
        >
          <Flex>
            <Input type="text" variant="flushed" placeholder="From" />
            <Input type="text" variant="flushed" placeholder="To" />
          </Flex>
          <Button variant="sky_primary">Find my trip!</Button>
        </Grid>
      </Flex>
    </Flex>
  );
}

export default App;
