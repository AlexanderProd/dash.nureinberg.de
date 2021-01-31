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
    <>
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
      {/* <span>
        Suchen:{' '}
        <input
          value={value || ''}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} Eintragungen...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span> */}
    </>
  );
};
