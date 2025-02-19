import { useContext, useEffect, useState } from "react";
import login from "../assets/login.png";
import { AppContext } from "../AppContext/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { authScreen, setAuthScreen } = useContext(AppContext);

  useEffect(() => {
    setUser({ name: "", email: "", password: "" });
  }, [authScreen]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = `/api/users/${authScreen === "login" ? "login" : "signup"}`;

      const { data } = await axios.post(url, user, { withCredentials: true });

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.errors) {
          errorData.errors.forEach((err) => toast.error(err));
        } else if (errorData.error) {
          toast.error(errorData.error);
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex max-lg:flex-col flex-row inset-0 fixed  h-full justify-center items-center">
      <div className="flex=[50%]  bg-blue-950">
        <img src={login} alt="" className="w-[741px] max-lg:hidden" />
      </div>
      <div className="w-[400px] m-auto  flex flex-col gap-7 p-8">
        <h1 className="text-[22px]">
          {authScreen === "login" ? "Login" : "SignUp"}
        </h1>
        <form action="" className="flex flex-col gap-4">
          {authScreen === "signup" ? (
            <div className="flex flex-col gap-2">
              <h2>Name</h2>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
                value={user.name}
                className="p-2 rounded shadow-md ring-2 ring-slate-200 outline-none hover:outline-none"
                placeholder="Full Name"
              />
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-col gap-2">
            <h2>Email address</h2>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              value={user.email}
              className="p-2 rounded shadow-md ring-2 ring-slate-200 outline-none hover:outline-none"
              placeholder="name@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2>Password</h2>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
              value={user.password}
              className="p-2 rounded ring-2 shadow-md ring-slate-200 outline-none hover:outline-none"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            onClick={(e) => handleAuth(e)}
            className="border-2 border-[#1F3487]  m-auto flex justify-center w-[250px] p-2 mt-8 rounded text-white bg-blue-950 hover:bg-blue-900"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin border-t-2 rounded-full w-5 h-5 border-white "></div>
            ) : authScreen === "login" ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        {authScreen === "login" ? (
          <h3>
            Don't have an Account ?{" "}
            <span
              className="text-[#3086B8] cursor-pointer"
              onClick={() => setAuthScreen("signup")}
            >
              Sign Up
            </span>
          </h3>
        ) : (
          <h3>
            Already have an Account?
            <span
              className="text-[#3086B8]  cursor-pointer"
              onClick={() => setAuthScreen("login")}
            >
              {" "}
              Login
            </span>
          </h3>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
