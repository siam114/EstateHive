import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import registerLottieData from "../assets/lottie/Animation - 1734851473080.json";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { saveUser } from "../api/utils";

const Register = () => {
  const { createUser, user, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      // User Registration using Google
      const result = await signInWithGoogle();

      // Save user info in database
      await saveUser(result?.user);

      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.error(err);
      toast.error("Google Sign-In Failed: " + err.message);
    }
  };

  // Redirect user if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Form Submission Handler
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    let hasError = false;

    // Validation
    if (name.length < 4) {
      setError((prev) => ({
        ...prev,
        name: "Name must be at least 4 characters long.",
      }));
      hasError = true;
    }
    if (!/[A-Z]/.test(password)) {
      setError((prev) => ({
        ...prev,
        password: "Password must include at least one uppercase letter.",
      }));
      hasError = true;
    }
    if (!/[a-z]/.test(password)) {
      setError((prev) => ({
        ...prev,
        password: "Password must include at least one lowercase letter.",
      }));
      hasError = true;
    }
    if (password.length < 6) {
      setError((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long.",
      }));
      hasError = true;
    }

    if (hasError) return;

    try {
      // Register user with email and password
      const result = await createUser(email, password);

      // Update profile with name and photo
      await updateUserProfile(name, photo);

      // Save user info in database
      await saveUser({ ...result?.user, displayName: name, photoURL: photo });

      toast.success("Signup Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Registration Failed: " + err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>EstateHive | Register</title>
      </Helmet>
      <div className="flex items-center justify-center flex-col lg:flex-row">
        <div className="text-center lg:text-left sm:w-[500px] w-[300px] sm:ml-44">
          <Lottie animationData={registerLottieData}></Lottie>
        </div>

        <div className="card bg-base-100 py-10 w-full mx-auto my-10 max-w-md shrink-0 shadow-2xl">
          <ToastContainer position="top-right" />
          <h2 className="text-2xl font-semibold text-center">
            Register your account
          </h2>
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
              />
            </div>
            {error.name && (
              <label className="text-xs text-red-600">{error.name}</label>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered"
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
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-4 top-12"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error.password && (
              <label className="text-xs text-red-600">{error.password}</label>
            )}

            <div className="form-control mt-6">
              <button className="btn dark:text-[#273248] dark:bg-slate-300 bg-[#363e94] text-white hover:text-black">
                Register
              </button>
            </div>
          </form>
          <p className="text-center font-semibold">
            Already Have an Account ?{" "}
            <Link to="/login" className="text-red-500">
              Login
            </Link>
          </p>

          <div className="divider">OR</div>
          <div className="form-control w-10/12 mx-auto">
            <button
              onClick={handleGoogleSignIn}
              className="btn border border-black"
            >
              <span className="text-2xl">
                <FcGoogle />
              </span>{" "}
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
