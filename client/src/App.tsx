import { Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Plane from "assets/plane-line.svg";
import { FlightSearch } from "components/organisms/FlightSearch";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Airport, Flight } from "types";

const LazyFlightsResult = lazy(
  () => import("components/organisms/FlightResults")
);

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
  const [showResults, setShowResults] = useState(false);
  const flightKey = `${flightState.departure.code}-${flightState.arrival.code}`;
  const prevFlightKey = useRef(flightKey);

  const {
    data: flightData,
    isInitialLoading,
    status,
  } = useQuery({
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
  useEffect(() => {
    if (status === "success" && !showResults) {
      setShowResults(true);
    }
  }, [status]);

  return (
    <Flex
      flexDir="column"
      flex="1"
      justifyContent="flex-start"
      overflow="hidden"
    >
      <Flex
        bg="white"
        p="4rem"
        h="50%"
        borderBottom="1px solid #eee"
        justifyContent="center"
        alignItems="center"
      >
        <Flex position="relative" justifyContent="center" alignItems="center">
          <Flex
            zIndex="1"
            position="absolute"
            w="160px"
            h="160px"
            opacity="0.18"
            transform="rotate(45deg)"
            sx={{
              svg: {
                w: "100%",
                h: "100%",
                fill: "secondary",
              },
            }}
          >
            <Plane />
          </Flex>
          <Text zIndex="2" fontSize="8xl" color="primary" fontWeight="bold">
            SmartSky
          </Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent="center"
        mt={{
          base: "-5.6rem",
          xl: "-9.6rem",
        }}
      >
        <FlightSearch
          onChange={(values) => setFlight((p) => ({ ...p, ...values }))}
          isLoading={isInitialLoading}
          onSearch={() => {
            if (status === "success" && !showResults) {
              setShowResults(true);
            }
            setSearchFlight(true);
          }}
        />
      </Flex>
      {flightData?.data && flightData.data.length > 0 && !isInitialLoading && (
        <Suspense fallback={null}>
          <LazyFlightsResult
            isOpen={showResults}
            onClose={() => setShowResults(false)}
            results={flightData.data}
            arrival={flightState.arrival}
            departure={flightState.departure}
          />
        </Suspense>
      )}
    </Flex>
  );
}

export default App;
