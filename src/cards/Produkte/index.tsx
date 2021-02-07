import React, { useMemo, useContext } from 'react';
import { Flex, Text, Stack, Skeleton, GridItemProps } from '@chakra-ui/react';

import MainContext from '../../context/Main';
import { useConditionalCellStyle } from '../../hooks';
import WarningBox from '../../components/ui/WarningBox';
import Table from '../../components/Table';
import Card from '../../components/Card';
import {
  SliderColumnFilter,
  SelectColumnFilter,
} from '../../components/Table/Filters';

const ProdukteCard = (props: GridItemProps) => {
  const {
    produkte: { data, status, error, fetchProdukte },
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
        show: false,
      },
      {
        Header: 'Produktnummer',
        accessor: 'Produktnummer',
        show: false,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Artikelnummer',
        accessor: (row: any) =>
          `${row['Textilkennzeichen']} ${row['Produktnummer']}`,
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
    <Card {...props}>
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
          fetchData={fetchProdukte}
          getCellProps={(useConditionalCellStyle as unknown) as () => {}}
        />
      )}

      {status === 'error' && <WarningBox errorMsg={error} />}
    </Card>
  );
};

export default ProdukteCard;
