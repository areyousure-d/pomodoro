export const getMinutes = (seconds: number): number => {
  return Math.floor(seconds / 60);
};

export const getSeconds = (seconds: number): number => {
  return seconds - getMinutes(seconds) * 60;
};
