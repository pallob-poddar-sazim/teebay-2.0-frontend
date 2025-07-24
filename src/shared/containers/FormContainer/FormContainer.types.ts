import { JSX } from "react";

export type TFormContainerProps = {
  title: string;
  form: () => JSX.Element;
  text: string;
  link: string;
  linkText: string;
};
