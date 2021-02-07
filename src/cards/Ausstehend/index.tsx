import React, { useMemo, useContext } from 'react';
import {
  Flex,
  Text,
  Box,
  Skeleton,
  GridItemProps,
  Heading,
} from '@chakra-ui/react';

import MainContext from '../../context/Main';
import Card from '../../components/Card';

const AusstehendCard = (props: GridItemProps) => {
  const { produkte, eintragungen } = useContext(MainContext);

  const openProducts = useMemo(() => {
    const openProducts: Array<{
      Textilkennzeichen: string;
      Produktnummer: string;
      Bestand: number;
      Name: string | undefined;
    }> = [];

    const open = produkte.data?.rows?.filter(produkt => produkt.Bestand < 0);

    open?.forEach(produkt => {
      eintragungen.data?.rows?.some(
        ({ Textilkennzeichen, Produktnummer, Name }) => {
          if (
            produkt.Textilkennzeichen === Textilkennzeichen &&
            produkt.Produktnummer === Produktnummer &&
            (Name !== undefined || Name !== '')
          )
            return openProducts.push({
              Textilkennzeichen,
              Produktnummer,
              Bestand: produkt.Bestand,
              Name,
            });
          return null;
        }
      );
    });

    return openProducts;
  }, [produkte, eintragungen]);

  return (
    <Card {...props}>
      <Flex flexWrap="wrap">
        {openProducts === undefined &&
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
            <Box
              p={3}
              bgColor="red.400"
              borderRadius={4}
              m={1}
              color="white"
              key={i}
            >
              <Heading size="sm">{`${produkt.Textilkennzeichen} ${produkt.Produktnummer}`}</Heading>
              <Text>{produkt.Bestand}</Text>
              <Text>{produkt.Name}</Text>
            </Box>
          ))}
      </Flex>
    </Card>
  );
};

export default AusstehendCard;
