export default function MonthsCard({
  year,
  month,
}: {
  year: number;
  month: string;
}) {
  return (
    <div className=" flex flex-col rounded-md p-6 shadow-md">
      <h1 className="text-xl font-bold">
        {month} de {year}
      </h1>
    </div>
  );
}
