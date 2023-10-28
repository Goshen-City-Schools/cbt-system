/* eslint-disable react/prop-types */
// import { FiSearch } from 'react-icons/fi';
import { Button, Box } from "@chakra-ui/react";

import { RiSearchLine } from "react-icons/ri";

import { Input } from "@chakra-ui/react";

const SearchWidget = ({ text, asButton, height = 12 }) => {
  return (
    <Box
      bg={"neutral.100"}
      border={"1px"}
      borderColor={"brand.700"}
      height={height}
      display={{ "base": "none", "md": "flex" }}
      className="w-full searchInput max-w-sm items-center gap-0.5 pl-3 rounded-lg"
    >
      <Box className="mr-3">
        <RiSearchLine />
      </Box>

      <Input
        border={"none"}
        bg={"transparent"}
        px={0}
        focusBorderColor="transparent"
        outline={"none"}
        type="search"
        name=""
        id=""
        placeholder={text}
        className="w-full flex-1 placeholder:text-sm text-sm"
      />

      {asButton ? (
        <Button
          h={"full"}
          bg={"brand.700"}
          color={"white"}
          className="mt-0 rounded-lg py-2 font-bold text-sm px-6 h-full bg-gray-700 text-white "
        >
          Search
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
};

export default SearchWidget;
