const padNumber = (time: number) => `${time < 10 ? '0' : ''}${time.toString()}`;

export const getTimeFromSeconds = (totalTime: number) => {
  const hour = Math.floor(totalTime / 3600);
  const displayHour = padNumber(hour);

  const minutes = Math.floor(totalTime / 60) % 60;
  const displayMinutes = padNumber(minutes);

  const seconds = totalTime % 60;
  const displaySeconds = padNumber(seconds);
  return [displayHour, displayMinutes, displaySeconds];
};

export const sleep = (milliseconds = 500) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));
