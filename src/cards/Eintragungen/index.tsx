import React, { useMemo, useContext } from 'react';
import { Flex, Text, Box, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { Row } from 'react-table';

import MainContext from '../../context/Main';
import StatusBadge from '../../components/ui/StatusBadge';
import WarningBox from '../../components/ui/WarningBox';
import EintragungForm from './EintragungForm';
import Table from '../../components/Table';
import EditRowModal from './EditRowModal';
import Card from '../../components/Card';
import { ShopifyIcon } from '../../components/ui/icons';
import {
  SelectColumnFilter,
  SliderColumnFilter,
  CheckboxColumnFilter,
} from '../../components/Table/Filters';
import { Eintragung } from '../../types';

const EintragungenCard = () => {
  const {
    eintragungen: { data, status, error, fetchEintragungen },
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
        Header: 'Shopify_Id',
        accessor: 'Shopify_Id',
        show: false,
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: 'Bestellnummer',
        accessor: 'Bestellnummer',
        disableFilters: true,
      },
      {
        Header: 'Datum',
        accessor: 'Datum',
        Cell: ({ value }: { value: string }) =>
          String(
            new Date(value).toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
          ),
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
        Header: 'Anzahl',
        accessor: 'Anzahl',
        Filter: SliderColumnFilter,
        filter: 'equals',
        isNumeric: true,
        Footer: (info: any) => {
          const total = React.useMemo(
            () =>
              info.rows.reduce(
                (sum: any, row: any) => row.values.Anzahl + sum,
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
      {
        Header: 'Produziert',
        accessor: 'Produziert',
        disableFilters: false,
        Filter: SelectColumnFilter,
        disableSortBy: true,
        isNumeric: true,
        Cell: ({ value }: { value: boolean }) => (value ? 1 : 0),
      },
      {
        Header: 'Status',
        accessor: 'Status',
        Filter: CheckboxColumnFilter,
        filter: (
          rows: Row<Eintragung>[],
          filler: any,
          filterValue: string[]
        ) => {
          const arr: any[] = [];
          rows.forEach(row => {
            if (filterValue.includes(row.original.Status)) arr.push(row);
          });
          return arr;
        },
        Cell: ({ value }: { value: string | undefined }) => (
          <StatusBadge value={value} />
        ),
      },
      {
        Header: 'Name',
        accessor: 'Name',
        disableSortBy: true,
      },
      {
        Header: 'Kommentar',
        accessor: 'Kommentar',
        disableSortBy: true,
      },
      {
        Header: 'Autor',
        accessor: 'Autor',
        Filter: SelectColumnFilter,
        filter: 'equals',
        Cell: ({ value, row }: { value: string | undefined; row: any }) =>
          value === 'Shopify' ? (
            <a
              href={`https://nureinberg.myshopify.com/admin/orders/${row.values['Shopify_Id']}`}
              target="_blank"
              rel="noreferrer"
            >
              <ShopifyIcon boxSize={10} />
            </a>
          ) : (
            value
          ),
      },
      {
        Header: '',
        id: 'Bearbeiten',
        disableFilters: true,
        disableSortBy: true,
        Cell: ({ row }: { row: any }) => <EditRowModal row={row} />,
      },
    ],
    []
  );

  return (
    <Card colSpan={12}>
      <Heading as="h1" marginBottom={8}>
        Eintragungen
      </Heading>

      <EintragungForm />

      <Box>
        {status === 'pending' && (
          <Stack>
            {new Array(12).fill('').map((_, i) => (
              <Skeleton key={i} height="45px" />
            ))}
          </Stack>
        )}
        {status === 'success' && (
          <Table data={rows} columns={columns} fetchData={fetchEintragungen} />
        )}
      </Box>

      {status === 'error' && <WarningBox errorMsg={error} />}
    </Card>
  );
};

export default EintragungenCard;
