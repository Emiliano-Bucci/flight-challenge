import { Flex, Grid, Skeleton, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FlightSearch } from "components/organisms/FlightSearch";
import { useEffect, useRef, useState } from "react";
import { FlightTicket } from "components/molecoles/FlightTicket";
import { Airport, Flight } from "types";

const defaultFlightState = {
  code: "",
  id: "",
  lat: "",
  lng: "",
  name: "",
};

type State = {
  departure: Airport;
  arrival: Airport;
};

function App() {
  const [flightState, setFlight] = useState<State>({
    departure: defaultFlightState,
    arrival: defaultFlightState,
  });
  const [searchFlight, setSearchFlight] = useState(false);

  const flightKey = `${flightState.departure.code}-${flightState.arrival.code}`;
  const prevFlightKey = useRef(flightKey);

  const { data: flightData, isInitialLoading } = useQuery({
    queryKey: !searchFlight ? [prevFlightKey.current] : [flightKey],
    enabled: searchFlight,
    onSuccess() {
      setSearchFlight(false);
    },
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
              departure: flightState.departure.code,
              arrival: flightState.arrival.code,
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

  useEffect(() => {
    prevFlightKey.current = flightKey;
  }, [flightKey]);

  return (
    <Flex flexDir="column" flex="1" justifyContent="flex-start" pb="8rem">
      <Flex
        bg="white"
        p="4rem"
        h="50%"
        borderBottom="1px solid #eee"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="8xl" color="primary" fontWeight="bold">
          SmartSky
        </Text>
      </Flex>
      <Flex justifyContent="center" mt="-9.6rem">
        <FlightSearch
          onChange={(values) => setFlight((p) => ({ ...p, ...values }))}
          onSearch={() => setSearchFlight(true)}
          isLoading={isInitialLoading}
        />
      </Flex>
      {/* <Flex px="4rem" w="100%" justifyContent="center" h="auto">
        <Grid
          bg="white"
          maxW="1200px"
          mt="4rem"
          p="4rem"
          boxShadow="2px 5.5px 12px rgba(0, 0, 0, 0.01), 2px 16px 52px rgba(0, 0, 0, 0.088)"
          borderRadius="12px"
          alignContent="start"
          gap="1.6rem"
          flex="1"
        >
          {isInitialLoading &&
            Array(6)
              .fill(0)
              .map((i, indx) => (
                <Skeleton
                  key={`flight-skeleton-${indx}`}
                  w="100%"
                  h="90px"
                  borderRadius="10px"
                />
              ))}
          {flightData?.data &&
            flightData.data.length > 0 &&
            !isInitialLoading &&
            flightData?.data?.map((flight) => {
              return (
                <FlightTicket
                  key={`${flight.code_departure}-${flight.code_arrival}-${flight.price}`}
                  departureAirport={flightState.departure}
                  arrivalAirport={flightState.arrival}
                  flight={flight}
                />
              );
            })}
        </Grid>
      </Flex> */}
    </Flex>
  );
}

export default App;
