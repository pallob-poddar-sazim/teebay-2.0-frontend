import SigninForm from "@/components/organisms/SigninForm";
import FormBox from "@/components/templates/FormBox";

const Signin = () => {
  return (
    <FormBox
      title="Sign In"
      form={SigninForm}
      text="Don't have an account?"
      link="/signup"
      linkText="Sign Up"
    />
  );
};

export default Signin;
