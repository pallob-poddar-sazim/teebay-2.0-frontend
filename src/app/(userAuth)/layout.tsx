import Nav from "@/shared/components/Nav";
import UserAuth from "@/shared/components/wrappers/AuthGuard/UserAuth";

type Props = {
  children: React.ReactNode;
};

export default function UserAuthLayout(props: Props) {
  return (
    <UserAuth>
      <Nav />
      {props.children}
    </UserAuth>
  );
}
