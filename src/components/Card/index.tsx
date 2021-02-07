import React from 'react';
import { GridItem, GridItemProps, Heading } from '@chakra-ui/react';

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
    <Heading as="h1" marginBottom={8}>
      {props.title}
    </Heading>
    {props.children}
  </GridItem>
);

export default Card;
