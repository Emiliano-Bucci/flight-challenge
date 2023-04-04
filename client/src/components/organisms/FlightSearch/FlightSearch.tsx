import { BoxProps, Button, Flex, Grid, chakra } from "@chakra-ui/react";
import { AirportSearch } from "components/molecoles/AirportSearch";
import FlightTakeofFill from "assets/flight-takeoff-fill.svg";
import FlightLandFill from "assets/flight-land-line.svg";
import { Airport } from "types";
import { ReactNode, useState } from "react";

function InputWrapper({
  children,
  icon,
  ...rest
}: { icon: ReactNode } & BoxProps) {
  return (
    <Flex alignItems="center" {...rest}>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexShrink="0"
        w="36px"
        h="36px"
        mr="0.8rem"
        bg="#ddd"
        borderRadius="4px"
      >
        {icon}
      </Flex>
      <Flex flex="1">{children}</Flex>
    </Flex>
  );
}

const defaultFlightState = {
  code: "",
  id: "",
  lat: "",
  lng: "",
  name: "",
};

type Props = {
  isLoading: boolean;
  onChange(props: Partial<{ departure: Airport; arrival: Airport }>): void;
  onSearch(): void;
};

export function FlightSearch({ onChange, onSearch, isLoading }: Props) {
  const [state, setState] = useState({
    departure: defaultFlightState,
    arrival: defaultFlightState,
  });
  return (
    <chakra.form
      bg="white"
      p="4rem"
      maxW="500px"
      borderRadius="20px"
      boxShadow="2px 5.5px 12px rgba(0, 0, 0, 0.01), 2px 16px 52px rgba(0, 0, 0, 0.088)"
      display="flex"
      flex="1"
      justifyContent="center"
      onSubmit={(e) => {
        e.preventDefault();
        onChange(state);
        onSearch();
      }}
    >
      <Grid flex="1" w="100%" gap="2.4rem">
        <Grid gridTemplateColumns="1fr" gap="3.2rem" alignItems="center">
          <InputWrapper icon={<FlightTakeofFill />}>
            <AirportSearch
              onChange={(value) =>
                setState((p) => ({ ...p, departure: value }))
              }
              inputProps={{
                placeholder: "From",
              }}
            />
          </InputWrapper>
          <InputWrapper icon={<FlightLandFill />}>
            <AirportSearch
              onChange={(value) => setState((p) => ({ ...p, arrival: value }))}
              inputProps={{
                placeholder: "To",
              }}
            />
          </InputWrapper>
        </Grid>
        <Button
          isLoading={isLoading}
          loadingText="Searching trip..."
          type="submit"
          variant="sky_primary"
          spinnerPlacement="start"
          isDisabled={!state.departure.code || !state.arrival.code}
        >
          Find my trip!
        </Button>
      </Grid>
    </chakra.form>
  );
}
