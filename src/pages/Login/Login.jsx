import { Link } from "react-router-dom";
import loginimg from "../../assets/others/authentication2.png";
import google from "../../assets/others/google.png";
import github from "../../assets/others/github.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect, useRef, useState } from "react";
const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const login = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const info = { email, password };
    console.log(info);
  };

  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="grid grid-cols-2 items-center py-10">
      <div>
        <img src={loginimg} alt="login" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">Login Now</h2>
        <form onSubmit={login} className="space-y-4">
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

          {/* captcha */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Captcha</span>
            </div>
            <LoadCanvasTemplate />
            <input
              ref={captchaRef}
              name="captcha"
              type="text"
              placeholder="Validate above captcha"
              className="input input-bordered w-full"
            />
            <button
              onClick={handleValidateCaptcha}
              className="btn btn-outline btn-info btn-xs mt-2"
            >
              Validate
            </button>
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
            disabled={disabled}
            type="submit"
            value="Login"
            className={`bg-[#D1A054] text-white w-full py-2 rounded ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          />
        </form>
        <div className="flex flex-col justify-center items-center gap-2 py-5">
          <h2>
            New Here?{" "}
            <Link to="/register" className="underline">
              Create A Account
            </Link>
          </h2>
          <h2>Or sign in with</h2>
          <div className="flex items-center justify-center gap-2">
            <img src={google} alt="" />
            <img src={github} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
