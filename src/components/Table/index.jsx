import React, { useMemo } from 'react';
import { matchSorter } from 'match-sorter';
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Stack,
  Text,
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Box,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
  RepeatIcon,
} from '@chakra-ui/icons';

import { DefaultColumnFilter, GlobalFilter } from './Filters';

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val;

const defaultPropGetter = () => ({});

const Table = ({
  columns,
  data,
  fetchData,
  defaultPageSize = 10,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
  ...props
}) => {
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headers,
    footerGroups,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: {
        hiddenColumns: columns
          .filter(col => col.show === false)
          .map(col => col.id || col.accessor),
        pageIndex: 0,
        pageSize: defaultPageSize,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <Flex justifyContent="space-between" marginBottom={4}>
        <Button onClick={() => fetchData()}>
          <RepeatIcon />
        </Button>

        <Popover autoFocus={false}>
          <PopoverTrigger>
            <Button float="right">Filter</Button>
          </PopoverTrigger>
          <PopoverContent boxShadow="lg">
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Stack spacing={3}>
                {headers.map(column =>
                  !column.disableFilters ? (
                    <div key={column.id}>
                      <Text>{column.render('Header')}</Text>
                      {column.canFilter ? column.render('Filter') : null}
                      <br />
                    </div>
                  ) : null
                )}
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <Box overflow="scroll" {...props}>
        <ChakraTable variant="striped" size="sm" {...getTableProps()}>
          <Thead>
            <Tr>
              {headers.map(column =>
                column.show !== false ? (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    whiteSpace="nowrap"
                  >
                    {column.render('Header')}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon />
                      ) : (
                        <TriangleUpIcon />
                      )
                    ) : (
                      <TriangleUpIcon visibility="hidden" />
                    )}
                  </Th>
                ) : null
              )}
            </Tr>
            <Tr>
              <Th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: 'left',
                }}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </Th>
            </Tr>
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <Td
                        isNumeric={cell.column.isNumeric}
                        {...cell.getCellProps([
                          {
                            className: cell.column.className,
                            style: cell.column.style,
                          },
                          getColumnProps(cell.column),
                          getCellProps(cell),
                        ])}
                      >
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>

          <Tfoot>
            {footerGroups.map(group => (
              <Tr {...group.getFooterGroupProps()}>
                {group.headers.map(column => (
                  <Td {...column.getFooterProps()}>
                    {column.render('Footer')}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tfoot>

          {pageOptions.length !== 1 && (
            <TableCaption>
              {page.length} von {rows.length} Ergebnissen.
              <br />
              Seite{' '}
              <strong>
                {pageIndex + 1} von {pageOptions.length}
              </strong>
            </TableCaption>
          )}
        </ChakraTable>
      </Box>

      {(canPreviousPage || canNextPage) && (
        <Stack
          spacing={4}
          direction="row"
          align="center"
          d="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="solid"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="solid"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <ArrowRightIcon />
          </Button>
        </Stack>
      )}
    </>
  );
};

export default Table;
