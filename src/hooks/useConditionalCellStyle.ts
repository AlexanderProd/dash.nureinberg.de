export const useConditionalCellStyle = ({ value }: { value: any }) => {
  if (typeof value === 'number' && value <= 0) {
    let colorValue = 'black;';

    if (value < 0) colorValue = '#F56565';
    if (value === 0) colorValue = '#ED8936';

    return {
      style: {
        color: 'white',
        backgroundColor: colorValue,
      },
    };
  } else {
    return {};
  }
};
