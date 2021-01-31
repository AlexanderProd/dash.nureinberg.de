import React from 'react';
import { Grid, GridProps } from '@chakra-ui/react';

const CardGrid = (props: GridProps) => (
  <Grid templateColumns="repeat(12, 1fr)" gap={6} margin={4} {...props}>
    {props.children}
  </Grid>
);

export default CardGrid;
