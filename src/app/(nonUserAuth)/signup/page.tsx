import SignupForm from "@/modules/signup/components";
import FormContainer from "@/shared/containers/FormContainer";

export default function Page() {
  return (
    <FormContainer
      title="Sign Up"
      form={SignupForm}
      text="Already have an account?"
      link="/signin"
      linkText="Sign In"
    />
  );
}
