type Props = {
  rows?: number;
  field?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  error?: boolean;
};

const TextArea = (props: Props) => {
  return (
    <textarea
      rows={props.rows}
      className={`p-3 w-full rounded-sm ${
        props.error
          ? `border border-red-500 focus:outline-red-500`
          : `focus:outline-purple border-2 border-gray`
      } `}
      {...props.field}
    ></textarea>
  );
};

export default TextArea;
