import { memo } from "react";

interface Props<T> {
  name: string;
  setFilter: (filter: T) => void;
  options: { label: string; value: T }[];
}

function SelectFilter<T>({ name, setFilter, options }: Props<T>) {
  return (
    <div className="flex my-4">
      <select
        name={name}
        className=" w-full md:w-44  h-10 border border-gray-400 rounded-md focus-visible:outline-none p-2 "
        onChange={(e) => setFilter(e.target.value as T)}
      >
        {options.map((option) => (
          <option key={option.value as string} value={option.value as string}>
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
}) as <T>(
  props: Props<T>
) => JSX.Element;

export default SelectFilterMemorized;