import SignupForm from "@/components/organisms/SignupForm";
import FormBox from "@/components/templates/FormBox";

const Signup = () => {
  return (
    <FormBox
      title="Sign Up"
      form={SignupForm}
      text="Already have an account?"
      link="/signin"
      linkText="Sign In"
    />
  );
};

export default Signup;
