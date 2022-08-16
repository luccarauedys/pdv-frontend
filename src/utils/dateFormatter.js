import format from "date-fns/format";

export const formatDate = (dateString) => {
  const correctDate = new Date(dateString);
  correctDate.setDate(correctDate.getDate() + 1);

  const formattedDate = format(correctDate, "dd-MM-yyyy");
  return formattedDate;
};
