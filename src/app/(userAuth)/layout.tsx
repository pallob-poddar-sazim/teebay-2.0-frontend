import UserAuth from "@/components/guards/UserAuth";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function UserAuthLayout(props: Props) {
  return <UserAuth>{props.children}</UserAuth>;
}
