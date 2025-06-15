import { JSX } from "react";
import Link from "next/link";

type Props = {
  title: string;
  form: () => JSX.Element;
  text: string;
  link: string;
  linkText: string;
};

const FormBox = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col p-12 border-2 border-gray rounded-xs">
        <h1 className="text-3xl text-jet-black text-center">
          {props.title.toUpperCase()}
        </h1>
        <props.form />
        <p className="text-center">
          {props.text}{" "}
          <Link href={props.link} className="text-blue">
            {props.linkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormBox;
