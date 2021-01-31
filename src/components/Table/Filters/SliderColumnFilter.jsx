import { useMemo } from 'react';
import {
  Slider,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  HStack,
  Text,
  CloseButton,
} from '@chakra-ui/react';

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
export const SliderColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id, Header },
}) => {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <HStack spacing={4}>
      <Text>{min}</Text>
      <Slider
        aria-label={`${Header}-Filter`}
        min={min}
        max={max}
        defaultValue={1}
        value={filterValue || min}
        onChange={value => {
          setFilter(parseInt(value, 10));
        }}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text>{max}</Text>
      <CloseButton size="sm" onClick={() => setFilter(undefined)} />
    </HStack>
  );
};
