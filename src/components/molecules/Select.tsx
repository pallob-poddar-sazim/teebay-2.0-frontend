type Props = {
  options: { value: string; label: string }[];
  field?: React.SelectHTMLAttributes<HTMLSelectElement>;
};

const Select = (props: Props) => {
  return (
    <select className="border-2 border-gray rounded-sm outline-gray p-3 w-full" {...props.field}>
      {props.options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
