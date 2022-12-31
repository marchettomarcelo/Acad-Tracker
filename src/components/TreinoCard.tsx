import React, { useState } from "react";
export default function TreinoCard({
  value,
  nome,
  handleCheckboxChange,
}: {
  value: string;
  nome: string;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex items-center rounded border border-gray-200 pl-4 dark:border-gray-700">
      <input
        id="bordered-checkbox-2"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          handleCheckboxChange(e);
          setIsChecked(e.target.checked);
        }}
        value={value}
        name="bordered-checkbox"
        className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100  dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 "
      />
      <label className="ml-2 w-full py-4 text-sm font-medium">{nome}</label>
    </div>
  );
}
