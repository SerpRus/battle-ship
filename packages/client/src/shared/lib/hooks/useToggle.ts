import { useState } from 'react';

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  function toggleValue() {
    setValue(previousValue => !previousValue);
  }

  return [value, toggleValue] as [boolean, () => void];
};
