import {
  Input,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";

export type Airport = {
  code: string;
  id: string;
  lat: string;
  lng: string;
  name: string;
  city: string;
};

type Props = {
  airports: Airport[];
  inputProps: {
    placeholder: string;
  };
  onChange(value: string): void;
};

export function AirportSearch({ inputProps, airports, onChange }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [search, set] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const filteredAirports = useMemo(() => {
    return airports
      .filter((i) => !!i.name)
      .filter(
        (i) =>
          search && i.name.toLowerCase().includes(searchValue.toLowerCase())
      );
  }, [searchValue]);
  const handleMemoSearch = useMemo(
    () => debounce((value: string) => setSearchValue(value), 300),
    []
  );

  useOutsideClick({
    ref: wrapperRef,
    handler: () => onClose(),
  });
  useEffect(() => {
    handleMemoSearch.cancel();
    handleMemoSearch(search);
  }, [search]);

  return (
    <Popover
      matchWidth
      isOpen={isOpen && searchValue.length >= 2}
      autoFocus={false}
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
            const newValue = e.currentTarget.value;
            set(newValue);

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
        <List listStyleType="none" display="grid" overflowY="auto">
          {filteredAirports.map((airport) => {
            return (
              <ListItem
                key={airport.id}
                p="0.48rem 0.8rem"
                borderRadius="4px"
                fontSize="1.48rem"
                onClick={() => {
                  set(airport.name);
                  onChange(airport.code);
                  onClose();
                }}
                _hover={{
                  bg: "#eee",
                  cursor: "pointer",
                }}
              >
                {airport.name}
              </ListItem>
            );
          })}
        </List>
      </PopoverContent>
    </Popover>
  );
}
