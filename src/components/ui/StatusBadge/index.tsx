import React, { useMemo } from 'react';
import { Badge } from '@chakra-ui/react';

const StatusBadge = ({ value }: { value: string | undefined }) => {
  const colorScheme = useMemo(() => {
    switch (value) {
      case 'Verkauf':
        return 'green';
      case 'Einkauf':
        return 'purple';
      case 'Storniert':
        return 'red';
      case 'Reklamation':
        return 'orange';
      case 'Produktion':
        return 'blue';
      case 'Schenkung':
        return 'pink';
      default:
        break;
    }
  }, [value]);

  return (
    <Badge variant="solid" colorScheme={colorScheme}>
      {value}
    </Badge>
  );
};

export default StatusBadge;
