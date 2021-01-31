import React, { useMemo, useContext } from 'react';
import { Text, Flex, Heading, Stack, Skeleton } from '@chakra-ui/react';

import MainContext from '../../context/Main';
import { useConditionalCellStyle } from '../../hooks';
import { SliderColumnFilter } from '../../components/Table/Filters';
import WarningBox from '../../components/ui/WarningBox';
import Table from '../../components/Table';
import Card from '../../components/Card';

const RohlingeCard = () => {
  const {
    rohlinge: { data, status, error, fetchRohlinge },
  } = useContext(MainContext);
  const rows = useMemo(() => data?.rows, [data]);
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'Id',
        show: false,
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: 'Textilkennzeichen',
        accessor: 'Textilkennzeichen',
        disableFilters: false,
      },
      {
        Header: 'Bestand',
        accessor: 'Bestand',
        Filter: SliderColumnFilter,
        filter: 'equals',
        isNumeric: true,
        Footer: (info: any) => {
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum: any, row: any) => row.values.Bestand + sum,
                0
              ),
            [info.rows]
          );

          return (
            <Flex justifyContent="space-between">
              <Text>Gesamt:</Text> <span>{total}</span>
            </Flex>
          );
        },
      },
    ],
    []
  );

  return (
    <Card colSpan={[12, 12, 6, 4, 3]} minW={[12, 12, 6, 4, 3]}>
      <Heading as="h1" marginBottom={8}>
        Rohlinge
      </Heading>

      {status === 'pending' && (
        <Stack>
          {new Array(12).fill('').map((_, i) => (
            <Skeleton key={i} height="30px" />
          ))}
        </Stack>
      )}

      {status === 'success' && (
        <Table
          data={rows}
          columns={columns}
          defaultPageSize={200}
          maxHeight="400px"
          fetchData={fetchRohlinge}
          getCellProps={(useConditionalCellStyle as unknown) as () => {}}
        />
      )}

      {error && <WarningBox errorMsg={error} />}
    </Card>
  );
};

export default RohlingeCard;
