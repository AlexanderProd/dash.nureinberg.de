import React from 'react';
import { GridItem, GridItemProps } from '@chakra-ui/react';

const Card = (props: GridItemProps) => (
  <GridItem
    {...props}
    border="1px"
    padding={4}
    shadow="base"
    bgColor="white"
    borderRadius="md"
    borderColor="gray.200"
  >
    {props.children}
  </GridItem>
);

export default Card;
