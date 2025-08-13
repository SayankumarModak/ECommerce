import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice/auth-slice";
import { LeafyGreen } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  // const toast = useToast

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData))
      .then((data) => {
        console.log("the data is", data);
        const message = data?.payload?.message;
        if (data?.payload?.success) {
          toast(message);
        } else {
          toast(message);
        }
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        toast("Registration failed. Please try again.");
      })
      .finally(() => {
        console.log("called here"); // This will always execute
      });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mt-2.5">
          Create New Account
        </h1>
        <p className="mt-2">
          Already Have an Account ?
          <Link
            to="/auth/login"
            className="font-medium ml-2 text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText={"Sign Up"}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
