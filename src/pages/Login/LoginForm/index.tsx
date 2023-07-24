import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import LabeledInput from "@/components/ui/labeledInput";
import { LoginSchemaType, loginSchema } from "@/validation/loginSchema";

const initialState = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: initialState,
  });

  const handleLogin = (data: LoginSchemaType) => {
    try {
      Cookies.set("username", data.username);

      navigate("/");
    } catch (error: T) {
      // eslint-disable-next-line no-console
      console.error("LOGIN ERROR", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="w-full">
      <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <LabeledInput
              label="Username"
              placeHolder="Username"
              type="text"
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <LabeledInput
              label="Password"
              placeHolder="Password"
              type="password"
              {...field}
            />
          )}
        />

        <Button className="w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <img
                src="/svgs/circular-loader.svg"
                alt="loader"
                className="text-white animate-spin mr-4"
              />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
