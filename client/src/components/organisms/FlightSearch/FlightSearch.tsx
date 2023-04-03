import { Airport } from "../../molecoles/AirportSearch";
import { Button, Grid, chakra } from "@chakra-ui/react";
import { AirportSearch } from "components/molecoles/AirportSearch";
import { useState } from "react";

import FlightTakeofFill from "./flight-takeoff-fill.svg";

type Props = {
  airports: Airport[];
  onSearch(props: { departure: string; arrival: string }): void;
};

export function FlightSearch({ airports, onSearch }: Props) {
  const [state, setState] = useState({
    departure: "",
    arrival: "",
  });

  return (
    <chakra.form
      display="flex"
      flex="1"
      justifyContent="center"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(state);
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
            airports={airports}
            onChange={(value) => setState((p) => ({ ...p, departure: value }))}
            inputProps={{
              placeholder: "From",
            }}
          />
          <FlightTakeofFill />
          <AirportSearch
            airports={airports}
            onChange={(value) => setState((p) => ({ ...p, arrival: value }))}
            inputProps={{
              placeholder: "To",
            }}
          />
        </Grid>
        <Button
          type="submit"
          variant="sky_primary"
          isDisabled={!state.departure || !state.arrival}
        >
          Find my trip!
        </Button>
      </Grid>
    </chakra.form>
  );
}
