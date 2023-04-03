import { Flex, Grid, Text } from "@chakra-ui/react";
import { Airport } from "../AirportSearch";
import { FlightTicketInfoColumn } from "./FlightTicketInfoColumn";

function formatCurrency(value: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
}

export type Flight = {
  code_departure: string;
  code_arrival: string;
  price: string;
  transfers: string;
};

type Props = {
  departureAirport: Airport | undefined;
  arrivalAirport: Airport | undefined;
  flight: Flight;
};

export function FlightTicket({
  departureAirport,
  arrivalAirport,
  flight,
}: Props) {
  return (
    <Grid
      border="1px solid #ccc"
      borderRadius="10px"
      p="2rem"
      bg="light"
      gridTemplateColumns="1fr 120px"
      gap="8rem"
      transition="border-color 140ms ease"
      _hover={{
        borderColor: "secondary",
      }}
    >
      <Grid
        gap="4rem"
        gridTemplateColumns="auto 1fr auto"
        w="100%"
        alignItems="center"
      >
        {departureAirport && (
          <FlightTicketInfoColumn
            justifyContent="start"
            textAlign="left"
            title="Partenza"
            content={departureAirport.name}
          />
        )}
        {arrivalAirport && (
          <FlightTicketInfoColumn
            title="Arrivo"
            content={arrivalAirport.name}
          />
        )}
      </Grid>
      <Flex w="auto" alignItems="center" justifyContent="flex-end">
        <Grid justifyItems="end">
          <Text fontSize="4xl" fontWeight="700">
            {formatCurrency(flight.price)}
          </Text>
          <Text fontSize="12px">
            {Number(flight.transfers) === 0 ? "Diretto" : "1 stop"}
          </Text>
        </Grid>
      </Flex>
    </Grid>
  );
}
