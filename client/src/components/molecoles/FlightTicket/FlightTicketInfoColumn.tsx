import { Box, BoxProps, Grid } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  title: string;
  content: ReactNode;
} & BoxProps;

export function FlightTicketInfoColumn({ title, content, ...rest }: Props) {
  return (
    <Grid gap="0.4rem" {...rest}>
      <Box fontSize="12px" fontWeight="700" color="secondaryDark">
        {title}
      </Box>
      <Box>{content}</Box>
    </Grid>
  );
}
