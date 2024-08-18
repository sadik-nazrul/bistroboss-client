import { Link } from "react-router-dom";
import loginimg from "../../assets/others/authentication2.png";
import google from "../../assets/others/google.png";
import github from "../../assets/others/github.png";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const { googleLogin } = useAuth();
  const handleGoogle = () => {
    googleLogin((result) => {
      const user = result.user;
      console.log(user);
    });
  };
  return (
    <div className="grid grid-cols-2 items-center py-10">
      <div>
        <h2 className="text-2xl font-bold">Create Your Account</h2>
        <form className="space-y-4">
          {/* name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              required
              name="name"
              type="name"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
          </label>

          {/* email */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              required
              name="email"
              type="email"
              placeholder="Your Mail"
              className="input input-bordered w-full"
            />
          </label>

          {/* Password */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              name="password"
              type="password"
              placeholder="******"
              className="input input-bordered w-full"
            />
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
            Have a Account?{" "}
            <Link to="/login" className="underline">
              Login Now
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
  );
};

export default SignUp;
