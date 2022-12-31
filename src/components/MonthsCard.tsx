export default function MonthsCard({
  year,
  month,
}: {
  year: number;
  month: string;
}) {
  return (
    <div className=" flex flex-col items-end justify-end rounded-md border-t p-6 shadow-lg">
      <div className="p-10" />
      <h1 className="text-xl font-bold">
        {month} de {year}
      </h1>
    </div>
  );
}
