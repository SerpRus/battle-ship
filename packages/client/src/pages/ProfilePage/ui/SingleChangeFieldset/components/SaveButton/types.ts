import type { HTMLAttributes, RefObject } from 'react';

export type TSaveButtonProps = HTMLAttributes<HTMLButtonElement> & {
  isDisabled?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  innerRef?: RefObject<HTMLButtonElement>;
};
