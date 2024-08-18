import { Link } from "react-router-dom";
import loginimg from "../../assets/others/authentication2.png";
import google from "../../assets/others/google.png";
import github from "../../assets/others/github.png";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const { googleLogin, createUser } = useAuth();
  //   hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  // google login
  const handleGoogle = () => {
    googleLogin((result) => {
      const user = result.user;
      console.log(user);
    });
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | SignUp</title>
      </Helmet>
      <div className="grid grid-cols-2 items-center py-10">
        <div>
          <h2 className="text-2xl font-bold">Create Your Account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                {...register("name", { required: true })}
                name="name"
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </label>

            {/* email */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                {...register("email", { required: true })}
                name="email"
                type="email"
                placeholder="Your Mail"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-600">Email is required</span>
              )}
            </label>

            {/* Password */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                {...register("password", {
                  required: true,
                  minLength: 8,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                name="password"
                type="password"
                placeholder="******"
                className="input input-bordered w-full"
              />
              {errors.password?.type === "required" && (
                <p>Password is Required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p>Password must 8 chacracter</p>
              )}
              {errors.password?.type === "pattern" && (
                <ul className="text-red-600">
                  <li>Ensure string has a uppercase letters.</li>
                  <li>Ensure string has a lowercase letters.</li>
                  <li>Ensure string has a digits.</li>
                  <li>Ensure string has a special character.</li>
                </ul>
              )}
            </label>

            {/* Submit BTN */}
            <input
              type="submit"
              value="Sign Up"
              className="bg-[#D1A054] text-white w-full py-2 rounded cursor-pointer"
            />
          </form>
          <div className="flex flex-col justify-center items-center gap-2 py-5">
            <h2>
              Already registered?{" "}
              <Link to="/login" className="underline">
                Go to log in
              </Link>
            </h2>
            <h2>Or sign in with</h2>
            <div className="flex items-center justify-center gap-2">
              <button onClick={handleGoogle}>
                <img src={google} alt="" />
              </button>
              <button>
                <img src={github} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <img src={loginimg} alt="login" />
        </div>
      </div>
    </>
  );
};

export default SignUp;
