import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex flex-col h-[100vh] w-full items-center">
      <div className="flex flex-col w-full h-full items-center justify-center gap-4">
        <Logo />

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="email"
            label="Enter Your Email"
            variant="outlined"
            className="w-[400px]"
            {...register("email")}
          />

          <TextField
            id="password"
            label="Enter Your Password"
            variant="outlined"
            className="w-[400px]"
            {...register("password")}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              padding: "0.75rem",
              width: "400px",
            }}
          >
            Sign in
          </Button>
        </form>

        <p>
          Don't Have Account?{" "}
          <Link to="/signup" className="underline font-semibold">
            Create your account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;