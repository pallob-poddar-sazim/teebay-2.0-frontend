import NonUserAuth from "@/components/guards/NonUserAuth";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function NonUserAuthLayout(props: Props) {
  return <NonUserAuth>{props.children}</NonUserAuth>;
}
