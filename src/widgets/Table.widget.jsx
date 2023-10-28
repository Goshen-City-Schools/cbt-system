/* eslint-disable react/prop-types */
import { useTable, usePagination, useSortBy } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Box,
  useStyleConfig,
  useMediaQuery,
} from "@chakra-ui/react";
import ReusableBadge from "../components/shared/ReusableBadge";
// import ReusableBadge from "../components/ReusableBadge";

const DataTable = ({ columns, data, fullWidthColumns }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)"); // Detect mobile view

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  const customStyles = useStyleConfig("Table"); // Get Chakra UI table styles

  return (
    <Box>
      <Table
        {...getTableProps()}
        className="custom-table"
        sx={{
          ...customStyles, // Apply default Chakra UI table styles
        }}
      >
        <Thead bg={"neutral.300"} whiteSpace={"nowrap"}>
          {headerGroups.map((headerGroup, index) => (
            <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  width={
                    fullWidthColumns?.includes(column.Header)
                      ? "100%"
                      : "max-content"
                  }
                  // Hide the column on mobile view
                  style={{
                    display:
                      isMobile && column.mobileHidden ? "none" : "table-cell",
                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()} fontSize={"sm"} whiteSpace={"nowrap"}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <Td
                    key={index}
                    {...cell.getCellProps()}
                    width={
                      fullWidthColumns?.includes(cell.column.Header)
                        ? "100%"
                        : "max-content"
                    }
                    // Hide the cell on mobile view if the corresponding column is hidden
                    style={{
                      display:
                        isMobile && cell.column.mobileHidden
                          ? "none"
                          : "table-cell",
                    }}
                  >
                    {/* Render the Approval Status column as a Badge */}
                    {(cell.column.id === "approvalStatus") |
                    (cell.column.id === "availabilityStatus") ? (
                      <ReusableBadge
                        colorScheme={getStatusColorScheme(cell.value)}
                        variant={getStatusVariant(cell.value)}
                      >
                        {cell.value}
                      </ReusableBadge>
                    ) : (
                      cell.render("Cell")
                    )}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex
        className="pagination"
        gap={4}
        mt={4}
        mx={"auto"}
        width={"max-content"}
      >
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
          </strong>{" "}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </Flex>
    </Box>
  );
};

const getStatusColorScheme = (status) => {
  switch (status) {
    case "Approved":
      return "green";
    case "Pending":
      return "yellow";
    case "Not Approved":
      return "red";
    default:
      return "gray";
  }
};

const getStatusVariant = (status) => {
  switch (status) {
    case "Approved":
      return "solid";
    case "Pending":
      return "subtle";
    case "Not Approved":
      return "outline";
    default:
      return "subtle";
  }
};

export default DataTable;
