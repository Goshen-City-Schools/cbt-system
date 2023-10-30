import { useState } from "react";
import { Input, Box, Text } from "@chakra-ui/react";

function SearchableInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Simulate search results (you can replace this with an actual API call)
    const results = mockSearchFunction(newSearchTerm);
    setSearchResults(results);
  };

  const mockSearchFunction = (query) => {
    // Simulate a search function, e.g., searching from an array of data
    // Replace this with your actual search logic or API call
    const data = [
      "Apple",
      "Banana",
      "Cherry",
      "Date",
      "Grape",
      "Lemon",
      "Orange",
      "Peach",
      "Pear",
      "Pineapple",
      "Strawberry",
      "Watermelon",
    ];

    return data.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <Box>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Box mt={4}>
        {searchResults.map((result, index) => (
          <Text key={index}>{result}</Text>
        ))}
      </Box>
    </Box>
  );
}

export default SearchableInput;
