import { memo } from "react";

interface Props {
  setFilter: (filter: string) => void;
  options: { label: string; value: string }[];
}

function SelectFilter({ setFilter, options }: Props) {
  return (
    <div className="flex my-4">
      <select
        name="filter"
        id="filter"
        className=" w-full md:w-28  h-10 border border-gray-400 rounded-md focus-visible:outline-none p-2 "
        onChange={(e) => setFilter(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const SelectFilterMemorized = memo(SelectFilter, (prevProps, nextProps) => {
  return (
    prevProps.options === nextProps.options &&
    prevProps.setFilter === nextProps.setFilter
  );
});

export default SelectFilterMemorized;
