import { Flex, Grid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Airport } from "./components/molecoles/AirportSearch";
import { FlightSearch } from "components/organisms/FlightSearch";
import { useState } from "react";
import { Flight, FlightTicket } from "components/molecoles/FlightTicket";

function App() {
  const [flight, setFlight] = useState({
    departure: "",
    arrival: "",
  });
  const { data: flightData } = useQuery({
    queryKey: [`${flight.departure}-${flight.arrival}`],
    enabled: !!flight.arrival && !!flight.departure,
    queryFn: async (): Promise<{ data: Flight[] }> => {
      try {
        const _response = await fetch(
          "http://localhost:8000/api/flights/index.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              departure: flight.departure,
              arrival: flight.arrival,
            }),
          }
        );
        if (!_response.ok) {
          throw new Error("AirportSearch error");
        }

        return await _response.json();
      } catch (error) {
        console.log(error);
        return {
          data: [],
        };
      }
    },
  });
  const { data: airportResponse } = useQuery({
    queryKey: ["airports"],
    queryFn: async (): Promise<{ data: Airport[] }> => {
      try {
        const _response = await fetch(
          "http://localhost:8000/api/airports/index.php",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!_response.ok) {
          throw new Error("AirportSearch error");
        }
        return await _response.json();
      } catch (error) {
        console.log(error);
        return {
          data: [],
        };
      }
    },
  });

  const airports =
    airportResponse?.data?.map((i) => ({
      ...i,
      name: `${i.name} (${i.code})`,
    })) ?? [];

  return (
    <Flex flexDir="column" flex="1" justifyContent="flex-start" pb="8rem">
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
        <FlightSearch onSearch={setFlight} airports={airports} />
      </Flex>
      <Grid
        bg="white"
        w="100%"
        maxW="1200px"
        mx="auto"
        mt="4rem"
        p="3.2rem"
        boxShadow="2px 5.5px 12px rgba(0, 0, 0, 0.01), 2px 16px 52px rgba(0, 0, 0, 0.088)"
        borderRadius="8px"
        gap="1.6rem"
      >
        {flightData?.data?.map((flight) => {
          const departureAirport = airports.find(
            (a) => a.code === flight.code_departure
          );
          const arrivalAirport = airports.find(
            (a) => a.code === flight.code_arrival
          );

          return (
            <FlightTicket
              key={`${flight.code_departure}-${flight.code_arrival}-${flight.price}`}
              departureAirport={departureAirport}
              arrivalAirport={arrivalAirport}
              flight={flight}
            />
          );
        })}
      </Grid>
    </Flex>
  );
}

export default App;
