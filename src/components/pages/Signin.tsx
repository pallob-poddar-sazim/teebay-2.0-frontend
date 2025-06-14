import SigninForm from "../organisms/SigninForm";
import FormBox from "../templates/FormBox";

const Signin = () => {
  return (
    <FormBox
      title="Sign In"
      form={SigninForm}
      text="Don't have an account?"
      link="/"
      linkText="Sign Up"
    />
  );
};

export default Signin;
