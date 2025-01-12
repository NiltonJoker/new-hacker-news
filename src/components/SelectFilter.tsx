import { ChangeEvent, memo, useRef } from "react";

interface Props<T> {
  name: string;
  options: { label: string; value: T }[];
  setFilter: (filter: T) => void;
}

function SelectFilter<T>({ name, setFilter, options }: Props<T>) {
  const selectRef = useRef<T>(options[0].value);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value as T;
    if (newValue !== selectRef.current) {
      setFilter(newValue);
    }
  };

  return (
    <div className="flex my-4">
      <label htmlFor={name} className="sr-only">
        {name}
      </label>
      <select
        id={name}
        name={name}
        className=" w-full md:w-44 h-10 border border-gray-400 rounded-md focus-visible:outline-none p-2 "
        onChange={handleChange}
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
}) as <T>(props: Props<T>) => JSX.Element;

export default SelectFilterMemorized;
export { SelectFilter };
