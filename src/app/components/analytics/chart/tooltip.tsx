/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomTooltip = ({ active, payload }: any) => {
  const DateFormatter = (date: string) => {
    const newDate = new Date(parseInt(date) * 1000);
    const toReturn =
      newDate.getDate() +
      "/" +
      (newDate.getMonth() + 1) +
      "/" +
      newDate.getFullYear();
    return toReturn;
  };

  if (active && payload && payload.length > 0) {
    return (
      <div className="rounded-lg bg-white p-3 shadow-lg">
        <p className="italic">{DateFormatter(payload[0].payload.date)}</p>

        <h2 className="text-lg font-bold">{`${payload[0].payload.name}`}</h2>
        <p className="label">Percentage: {`${payload[0].value}%`}</p>
        <p className="intro">
          Marks:{" "}
          {`${payload[0].payload.achievedMarks}/${payload[0].payload.maxMarks}`}
        </p>
      </div>
    );
  }

  return null;
};
