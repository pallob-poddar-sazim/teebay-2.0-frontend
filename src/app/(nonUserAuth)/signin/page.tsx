import SigninForm from "@/modules/signin/components";
import FormContainer from "@/shared/containers/FormContainer";

export default function Page() {
  return (
    <FormContainer
      title="Sign In"
      form={SigninForm}
      text="Don't have an account?"
      link="/signup"
      linkText="Sign Up"
    />
  );
}
