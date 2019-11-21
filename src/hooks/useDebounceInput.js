import { useState, useEffect } from 'react';

export default function useDebounceInput(input, delay) {

  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(
    () => {
      // Set debouncedInput only after the specified delay
      const handler = setTimeout(() => {
        setDebouncedInput(input);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect when input changes
    [input, delay]
  );

  return debouncedInput;
}
