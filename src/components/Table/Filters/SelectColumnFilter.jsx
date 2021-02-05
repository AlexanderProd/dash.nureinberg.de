import { useMemo } from 'react';
import { Select } from '@chakra-ui/react';

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      if (row.values[id] !== null && row.values[id] !== '')
        return options.add(String(row.values[id]));
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <Select
      size="sm"
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">Alle</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};
