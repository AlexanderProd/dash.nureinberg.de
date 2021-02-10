import React, { useMemo, useContext, useEffect } from 'react';
import {
  Flex,
  Text,
  Skeleton,
  GridItemProps,
  useToast,
} from '@chakra-ui/react';

import OpenProductBox from './OpenProductBox';
import MainContext from '../../context/Main';
import Card from '../../components/Card';
import { useAPICall } from '../../hooks';
import { Eintragung } from '../../types';

export interface OpenProductType extends Eintragung {
  Bestand: number;
}

const AusstehendCard = (props: GridItemProps) => {
  const { produkte, eintragungen, rohlinge } = useContext(MainContext);
  const fetchEintragungen = eintragungen.fetchEintragungen;
  const fetchProdukte = produkte.fetchProdukte;
  const fetchRohlinge = rohlinge.fetchRohlinge;

  const { status, error, fetchData } = useAPICall({
    url: '/bestand/eintragung',
    method: 'POST',
    immediate: false,
  });
  const toast = useToast();

  const openProducts = useMemo(() => {
    const openProducts: Array<OpenProductType> = [];

    const open = produkte.data?.rows?.filter(produkt => produkt.Bestand < 0);

    open?.forEach(produkt => {
      eintragungen.data?.rows?.some(eintragung => {
        if (
          produkt.Textilkennzeichen === eintragung.Textilkennzeichen &&
          produkt.Produktnummer === eintragung.Produktnummer &&
          eintragung.Produziert === false &&
          (eintragung.Status === 'Schenkung' || eintragung.Status === 'Verkauf')
        )
          return openProducts.push({
            ...eintragung,
            Bestand: Math.abs(produkt.Bestand),
          });
        return null;
      });
    });

    if (eintragungen.status === 'pending' || produkte.status === 'pending') {
      return undefined;
    } else {
      return openProducts;
    }
  }, [produkte, eintragungen]);

  useEffect(() => {
    if (status === 'error') {
      console.error(error);
      toast({
        title: 'Ein Fehler ist aufgetreten.',
        description: error.name ?? error,
        status: 'error',
        duration: 20000,
        isClosable: true,
      });
    }
  }, [error, status, toast]);

  useEffect(() => {
    if (status === 'success') {
      fetchEintragungen();
      fetchProdukte();
      fetchRohlinge();
    }
  }, [status, fetchEintragungen, fetchProdukte, fetchRohlinge]);

  const addProductionEntry = (product: OpenProductType) => {
    fetchData(false, {
      produktnummer: product.Produktnummer,
      textilkennzeichen: product.Textilkennzeichen,
      name: product.Name,
      anzahl: 1,
      status: 'Produktion',
    });
  };

  return (
    <Card {...props}>
      <Flex flexWrap="wrap">
        {!openProducts &&
          new Array(3)
            .fill('')
            .map((_, i) => (
              <Skeleton
                key={i}
                height={16}
                width="30%"
                m={1}
                borderRadius={4}
              />
            ))}

        {openProducts &&
          openProducts?.map((produkt, i) => (
            <OpenProductBox
              key={i}
              produkt={produkt}
              status={status}
              addProductionEntry={addProductionEntry}
            />
          ))}

        {openProducts === [] && <Text>Keine ausstehenden Produkte.</Text>}
      </Flex>
    </Card>
  );
};

export default AusstehendCard;
