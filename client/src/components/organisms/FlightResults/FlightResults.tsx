import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  useMediaQuery,
} from "@chakra-ui/react";
import { Airport, Flight } from "types";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { FlightTicket } from "components/molecoles/FlightTicket";
import { useState } from "react";

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
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDlQiv_MnZ-4GNXt9eXNZ4FZprT8NdmuDY",
  });

  const [markers, setMarkers] = useState(false);

  const coords = {
    lat: [Number(arrival.lat), Number(departure.lat)],
    lng: [Number(arrival.lng), Number(departure.lng)],
  };

  const averageCoords = {
    lat: (Math.max(...coords.lat) + Math.min(...coords.lat)) / 2,
    lng: (Math.max(...coords.lng) + Math.min(...coords.lng)) / 2,
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent
        p={{
          base: "2.4rem",
          lg: "4rem",
        }}
        h={{
          base: "100%",
          xl: "88%",
        }}
      >
        <Flex
          flexDir="column"
          mx="auto"
          gap="3.2rem"
          w="100%"
          overflow="hidden"
          h="100%"
        >
          <Grid
            flex="1"
            gap="4rem"
            overflow="hidden"
            gridTemplateColumns={{
              base: "1fr",
              xl: "repeat(2, 1fr)",
            }}
          >
            <Grid
              w="100%"
              gap="2rem"
              overflowY="auto"
              alignSelf="start"
              h={isMobile ? "100%" : "auto"}
            >
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
            {isLoaded && !isMobile && (
              <GoogleMap
                center={averageCoords}
                onUnmount={() => setMarkers(false)}
                onLoad={(map) => {
                  const bounds = new google.maps.LatLngBounds();

                  bounds.extend({
                    lat: Number(departure.lat),
                    lng: Number(departure.lng),
                  });
                  bounds.extend({
                    lat: Number(arrival.lat),
                    lng: Number(arrival.lng),
                  });

                  map.fitBounds(bounds);

                  setTimeout(() => {
                    setMarkers(true);
                  }, 500);
                }}
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "16px",
                  boxShadow:
                    "2px 5.5px 12px rgba(0, 0, 0, 0.01), 2px 16px 52px rgba(0, 0, 0, 0.088)",
                }}
              >
                {markers && (
                  <Polyline
                    path={[
                      {
                        lat: Number(departure.lat),
                        lng: Number(departure.lng),
                      },
                      { lat: Number(arrival.lat), lng: Number(arrival.lng) },
                    ]}
                    options={{
                      geodesic: true,
                      strokeColor: "#0c3351",
                      strokeOpacity: 1.0,
                      strokeWeight: 2,
                    }}
                  />
                )}
                {markers && (
                  <Marker
                    position={{
                      lat: Number(departure.lat),
                      lng: Number(departure.lng),
                    }}
                  />
                )}
                {markers && (
                  <Marker
                    position={{
                      lat: Number(arrival.lat),
                      lng: Number(arrival.lng),
                    }}
                  >
                    <Box>asdsadas</Box>
                  </Marker>
                )}
              </GoogleMap>
            )}
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
