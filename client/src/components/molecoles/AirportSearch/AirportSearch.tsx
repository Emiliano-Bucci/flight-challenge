import {
  Box,
  Grid,
  Input,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Airport } from "types";
import Sad from "assets/emotion-sad-line.svg";

type Props = {
  inputProps: {
    placeholder: string;
  };
  onChange(value: Airport): void;
};

export function AirportSearch({ inputProps, onChange }: Props) {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const warapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [search, set] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const queryKey = `airports-${searchValue}`;
  const prevQueryKey = useRef(queryKey);

  const {
    data: airportsResponse,
    isInitialLoading,
    isLoading,
  } = useQuery({
    queryKey: searchValue.length < 3 ? [prevQueryKey.current] : [queryKey],
    enabled: !!searchValue && searchValue.length > 2,
    queryFn: async ({ signal }): Promise<{ data: Airport[] }> => {
      try {
        const _response = await fetch(
          "http://localhost:8000/api/airports/index.php",
          {
            signal,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              search: searchValue.toLowerCase(),
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
  const airports = useMemo(() => {
    return (
      airportsResponse?.data?.map((i) => ({
        ...i,
        label: `${i.name} (${i.code})`,
      })) ?? []
    );
  }, [airportsResponse]);

  const handleMemoSearch = useMemo(
    () => debounce((value: string) => setSearchValue(value), 300),
    []
  );

  useOutsideClick({
    ref: warapperRef,
    handler: () => onClose(),
  });

  useEffect(() => {
    prevQueryKey.current = `airports-${searchValue}`;
  }, [searchValue]);

  return (
    <Box ref={warapperRef} w="100%">
      <Popover
        matchWidth
        isOpen={isOpen && searchValue.length > 2}
        initialFocusRef={inputRef}
      >
        <PopoverTrigger>
          <Input
            ref={inputRef}
            type="text"
            variant="flushed"
            fontSize="1.48rem"
            placeholder={inputProps.placeholder}
            value={search}
            onClick={() => onOpen()}
            onChange={(e) => {
              queryClient.cancelQueries({ queryKey: [queryKey] });
              handleMemoSearch.cancel();
              const newValue = e.currentTarget.value;
              set(newValue);
              handleMemoSearch(newValue);

              if (newValue.length === 0) {
                onClose();
              }
              if (newValue.length >= 2) {
                onOpen();
              }
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          w="100%"
          p="1.2rem"
          borderRadius="8px"
          boxShadow="2px 5.5px 12px rgba(0, 0, 0, 0.01), 2px 16px 52px rgba(0, 0, 0, 0.088)"
          maxH="480px"
        >
          <List
            listStyleType="none"
            display="grid"
            overflowY="auto"
            gap={isLoading && isInitialLoading ? "4px" : "0px"}
          >
            {isLoading &&
              isInitialLoading &&
              Array(4)
                .fill(0)
                .map((i, indx) => (
                  <Skeleton
                    h="30px"
                    borderRadius="4px"
                    key={`loading-result-${inputProps.placeholder}-${indx}`}
                  />
                ))}
            {!isLoading && !isInitialLoading && airports.length === 0 && (
              <Grid
                justifyContent="center"
                justifyItems="center"
                py="1.6rem"
                gap="0.8rem"
              >
                <Sad />
                <Text>No results!</Text>
              </Grid>
            )}
            {!isInitialLoading &&
              airports.map((airport) => {
                return (
                  <ListItem
                    key={airport.id}
                    p="0.64rem 0.8rem"
                    borderRadius="4px"
                    fontSize="1.48rem"
                    onClick={() => {
                      set(airport.name);
                      onChange(airport);
                      onClose();
                    }}
                    _hover={{
                      bg: "#eee",
                      cursor: "pointer",
                    }}
                  >
                    {airport.label}
                  </ListItem>
                );
              })}
          </List>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
