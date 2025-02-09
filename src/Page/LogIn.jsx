import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginLottieData from "../assets/lottie/login.json";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.init";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { getDBUser } from "../api/utils";
import { useAuth } from "../hook/useAuth";

const LogIn = () => {
  const { signInUser, setUser, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const provider = new GoogleAuthProvider();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);
      if (!result?.user?.email) {
        toast.error("Google sign-in failed! Please try again.");
        return;
      }
      const user = await getDBUser(result.user.email);
      if (!user) return;

      setUser(user);
      toast.success("Google sign-in successful!");
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      setError(error.response.data.message)
      toast.error("Google sign-in failed! Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result?.user?.email) {
        toast.error("Google sign-in failed! Please try again.");
        return;
      }
      const user = await getDBUser(result.user.email);
      if (!user) return;

      setUser(user);
      toast.success("Google sign-in successful!");
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in failed! Please try again.");
    }
  };

  useEffect(() => {
    if (!!user && typeof window != "undefined") {
      window.location.replace("/");
    }
  }, [user]);
  return (
    <>
      <Helmet>
        <title>EstateHive | LogIn</title>
      </Helmet>
      <div className="flex items-center justify-center flex-col lg:flex-row">
        <div className="text-center lg:text-left sm:w-[500px] w-[300px] sm:ml-44 px-5">
          <Lottie animationData={loginLottieData}></Lottie>
        </div>

        <div className="card bg-base-100 py-10 w-full mx-auto my-10 max-w-md shrink-0 shadow-2xl">
          <ToastContainer position="top-right" />
          <h2 className="text-2xl font-semibold text-center">
            Login your account
          </h2>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="btn btn-xs absolute right-4 top-12"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {error.login && (
                <label className="label text-sm text-red-600">
                  {error.login}
                </label>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn dark:text-[#273248] dark:bg-slate-300 bg-[#363e94] text-white hover:text-black">
                Login
              </button>
            </div>
          </form>
          <p className="text-center font-semibold">
            Do not Have an Account?{" "}
            <Link to="/register" className="text-red-500">
              Register
            </Link>
          </p>

          <div className="divider">OR</div>
          <div className="form-control w-10/12 mx-auto">
            <button
              onClick={handleGoogleSignIn}
              className="btn border border-black"
            >
              <span className="text-2xl">
                <FcGoogle />{" "}
              </span>{" "}
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
