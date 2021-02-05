import { useMemo } from 'react';
import { Checkbox } from '@chakra-ui/react';

export const CheckboxColumnFilter = ({
  column: { filterValue = [], setFilter, preFilteredRows, id },
}) => {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      if (row.values[id] !== null && row.values[id] !== '')
        options.add(String(row.values[id]));
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  const setFilteredParams = (filterArr, val) => {
    if (filterArr.includes(val)) {
      filterArr = filterArr.filter(n => {
        return n !== val;
      });
    } else filterArr.push(val);

    if (filterArr.length === 0) filterArr = undefined;
    return filterArr;
  };

  return (
    <>
      {options.map((option, i) => (
        <Checkbox
          key={i}
          name={option}
          value={option}
          onChange={e => {
            setFilter(setFilteredParams(filterValue, e.target.value));
          }}
        >
          {option}
          &nbsp; &nbsp;
        </Checkbox>
      ))}
    </>
  );
};
