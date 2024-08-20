import { Link, useNavigate } from "react-router-dom";
import loginimg from "../../assets/others/authentication2.png";
import google from "../../assets/others/google.png";
import github from "../../assets/others/github.png";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
  const { googleLogin, createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  //   hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const user = result.user;
      console.log(user);
      updateUserProfile(data.name, data.photo)
        .then(() => {
          // Create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("User Addeded to the database");

              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "user profile updated",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  // google login
  const handleGoogle = () => {
    googleLogin().then((result) => {
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
      };
      axiosPublic
        .post("/users", userInfo)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
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

            {/* Photo */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Photo URL</span>
              </div>
              <input
                {...register("photo", { required: true })}
                name="photo"
                type="text"
                placeholder="Photo URL"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-600">Photo URL is required</span>
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
