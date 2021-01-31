import React from 'react';

import CardGrid from '../../components/CardGrid';
import RohlingeCard from '../../cards/Rohlinge';
import ProdukteCard from '../../cards/Produkte';
import EintragungenCard from '../../cards/Eintragungen';

const BestandPage = () => {
  return (
    <CardGrid>
      <RohlingeCard />
      <ProdukteCard />
      <EintragungenCard />
    </CardGrid>
  );
};

export default BestandPage;
