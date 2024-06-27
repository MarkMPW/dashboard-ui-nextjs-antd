export const delayTimeout = (miliSec: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, miliSec));
};
