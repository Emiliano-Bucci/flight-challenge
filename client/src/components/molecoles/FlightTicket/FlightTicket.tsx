import { Flex, Grid, Text } from "@chakra-ui/react";

import { FlightTicketInfoColumn } from "./FlightTicketInfoColumn";
import { Airport, Flight } from "types";

function formatCurrency(value: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
}

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
      bg="light"
      gridTemplateColumns="1fr 120px"
      transition="border-color 140ms ease"
      gap={{
        base: "2.4rem",
        lg: "4rem",
      }}
      p={{
        base: "1.24rem",
        lg: "2rem",
      }}
      _hover={{
        borderColor: "secondary",
      }}
    >
      <Grid
        w="100%"
        alignItems="center"
        gridTemplateColumns={{
          base: "1fr",
          md: "1fr 1fr",
        }}
        gap={{
          base: "1.6rem",
          lg: "4rem",
        }}
      >
        {departureAirport && (
          <FlightTicketInfoColumn
            textAlign="left"
            title="Partenza"
            justifyContent="start"
            content={departureAirport.name}
          />
        )}
        {arrivalAirport && (
          <FlightTicketInfoColumn
            title="Arrivo"
            content={arrivalAirport.name}
            justifyContent="start"
          />
        )}
      </Grid>
      <Flex w="auto" alignItems="center" justifyContent="flex-end">
        <Grid justifyItems="end">
          <Text
            fontWeight="700"
            fontSize={{
              base: "3xl",
              lg: "4xl",
            }}
          >
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
