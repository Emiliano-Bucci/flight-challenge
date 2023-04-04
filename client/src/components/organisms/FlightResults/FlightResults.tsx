import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { Airport, Flight } from "types";
import { FlightTicket } from "components/molecoles/FlightTicket";

type Props = {
  isOpen: boolean;
  results: Flight[];
  departure: Airport;
  arrival: Airport;
  onClose(): void;
};

export function FlightResults({
  isOpen,
  onClose,
  results,
  departure,
  arrival,
}: Props) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent h="88%" p="4rem">
        <Flex
          flexDir="column"
          mx="auto"
          gap="3.2rem"
          maxW="960px"
          w="100%"
          overflow="hidden"
        >
          <Grid w="100%" gap="2rem" flex="1" overflowY="auto">
            {results.map((flight) => {
              return (
                <FlightTicket
                  key={`${flight.code_departure}-${flight.code_arrival}-${flight.price}`}
                  departureAirport={departure}
                  arrivalAirport={arrival}
                  flight={flight}
                />
              );
            })}
          </Grid>
          <Flex justifyContent="center">
            <Button onClick={onClose} variant="sky_secondary" w="160px">
              Close
            </Button>
          </Flex>
        </Flex>
      </DrawerContent>
    </Drawer>
  );
}
