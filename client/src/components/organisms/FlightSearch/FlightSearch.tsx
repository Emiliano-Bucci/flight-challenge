import { Button, Grid, chakra } from "@chakra-ui/react";
import { AirportSearch } from "components/molecoles/AirportSearch";

import FlightTakeofFill from "./flight-takeoff-fill.svg";
import { Airport } from "types";
import { useState } from "react";

const defaultFlightState = {
  code: "",
  id: "",
  lat: "",
  lng: "",
  name: "",
};

type Props = {
  onChange(props: Partial<{ departure: Airport; arrival: Airport }>): void;
  onSearch(): void;
};

export function FlightSearch({ onChange, onSearch }: Props) {
  const [state, setState] = useState({
    departure: defaultFlightState,
    arrival: defaultFlightState,
  });
  return (
    <chakra.form
      display="flex"
      flex="1"
      justifyContent="center"
      onSubmit={(e) => {
        e.preventDefault();
        onChange(state);
        onSearch();
      }}
    >
      <Grid
        flex="1"
        bg="white"
        p="4rem"
        w="100%"
        maxW="600px"
        borderRadius="16px"
        boxShadow="2px 5.5px 12px rgba(0, 0, 0, 0.01), 2px 16px 52px rgba(0, 0, 0, 0.088)"
        mt="-4.8rem"
        gap="2.4rem"
      >
        <Grid
          gridTemplateColumns="1fr auto 1fr"
          gap="1.6rem"
          alignItems="center"
        >
          <AirportSearch
            onChange={(value) => setState((p) => ({ ...p, departure: value }))}
            inputProps={{
              placeholder: "From",
            }}
          />
          <FlightTakeofFill />
          <AirportSearch
            onChange={(value) => setState((p) => ({ ...p, arrival: value }))}
            inputProps={{
              placeholder: "To",
            }}
          />
        </Grid>
        <Button
          type="submit"
          variant="sky_primary"
          isDisabled={!state.departure.code || !state.arrival.code}
        >
          Find my trip!
        </Button>
      </Grid>
    </chakra.form>
  );
}
