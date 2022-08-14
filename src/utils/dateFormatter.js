export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR").format(date);
};
