import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';

export const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <InputGroup size="sm">
      <InputLeftAddon children="Suchen" />
      <Input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} Eintragungen...`}
      />
    </InputGroup>
  );
};
