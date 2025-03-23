export function FormatDate({ dateString }) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}
export const Amount = ({ amount }) => {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  }).format(amount);

  return formattedAmount;
};
