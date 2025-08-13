import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  email: "",
  password: "",
};
function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      const message = data?.payload?.message;
      const success = data?.payloda?.success;
      if (success) {
        toast(message);
      } else {
        toast(message);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mt-2.5">
          Sign into your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            to="/auth/register"
            className="font-medium ml-2 text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText={"Sign In"}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
