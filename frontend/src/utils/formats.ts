export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

  // Opcje formatujące datę
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return new Intl.DateTimeFormat("pl-PL", options).format(date);
};
