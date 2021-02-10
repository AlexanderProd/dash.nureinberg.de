import React from 'react';
import { Box, Flex, Text, Button, Wrap, WrapItem } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import StatusBadge from '../../../components/ui/StatusBadge';
import { ShopifyIcon } from '../../../components/ui/icons';
import { OpenProductType } from '../';

const OpenProductBox = ({
  produkt,
  status,
  addProductionEntry,
}: {
  produkt: OpenProductType;
  status: 'idle' | 'error' | 'pending' | 'success';
  addProductionEntry: (product: OpenProductType) => void;
}) => {
  return (
    <Box w="100%" borderWidth="1px" borderRadius={4} mb={3}>
      <Box p={3}>
        <Flex justifyContent="space-between">
          <Text mb="1" fontSize="xl" lineHeight="tight" fontWeight="semibold">
            {produkt.Textilkennzeichen} {produkt.Produktnummer}
          </Text>
          <Button
            colorScheme="green"
            size="sm"
            isLoading={status === 'pending'}
            onClick={() => addProductionEntry(produkt)}
          >
            <CheckIcon />
          </Button>
        </Flex>
        <Flex alignItems="baseline" mb="1">
          <StatusBadge value={produkt.Status} />
          <Text
            ml="2"
            fontSize="sm"
            color="gray.500"
            letterSpacing="wide"
            fontWeight="semibold"
          >
            {new Date(produkt.Datum!).toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </Text>
        </Flex>
        <Wrap spacing={2}>
          <WrapItem>
            <Text fontWeight="semibold">Anzahl:</Text>{' '}
            <Text ml="2">{produkt.Bestand}</Text>
          </WrapItem>
          <WrapItem>
            <Text fontWeight="semibold">Name:</Text>{' '}
            <Text ml="2">{produkt.Name}</Text>
          </WrapItem>
          {produkt.Kommentar && (
            <WrapItem>
              <Text fontWeight="semibold">Kommentar:</Text>{' '}
              <Text ml="2">{produkt.Kommentar}</Text>
            </WrapItem>
          )}
        </Wrap>
        {produkt.Autor === 'Shopify' && (
          <a
            href={`https://nureinberg.myshopify.com/admin/orders/${produkt.Shopify_Id}`}
            target="_blank"
            rel="noreferrer"
          >
            <ShopifyIcon boxSize={12} />
          </a>
        )}
      </Box>
    </Box>
  );
};

export default OpenProductBox;
