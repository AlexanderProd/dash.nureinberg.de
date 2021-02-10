import React from 'react';

import CardGrid from '../../components/CardGrid';
import RohlingeCard from '../../cards/Rohlinge';
import ProdukteCard from '../../cards/Produkte';
import EintragungenCard from '../../cards/Eintragungen';
import Ausstehend from '../../cards/Ausstehend';

const BestandPage = () => {
  return (
    <CardGrid>
      <RohlingeCard
        title="Rohlinge"
        colSpan={[12, 12, 6, 4, 3]}
        minW={[12, 12, 6, 4, 3]}
        rowSpan={2}
        rowEnd={2}
      />
      <ProdukteCard
        title="Produkte"
        colSpan={[12, 12, 6, 4, 3]}
        minW={[12, 12, 6, 4, 3]}
        rowSpan={2}
        maxH="100%"
      />
      <Ausstehend
        title="Zu Produzieren"
        colSpan={[12, 12, 6, 4, 3]}
        minW={[12, 12, 6, 4, 3]}
        rowSpan={1}
      />
      <EintragungenCard title="Eintragungen" colSpan={12} />
    </CardGrid>
  );
};

export default BestandPage;
