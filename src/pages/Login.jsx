import React, { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import CustomButton from "../components/CustomButton";
import CustomParagraph from "../components/CustomParagraph";
import CustomHeader from "../components/CustomHeader";

const Login = () => {
  const { loggedIn, setLoggedIn, token, setToken, userID, setUserID } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = async () => {
    setLoginError(false);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      };
      setLoading(true);
      const response = await fetch("http://localhost:4000/auth/token", options);
      const data = await response.json();
      const tokenValue = data.token;
      const userIDValue = data.userId;
      console.log(response);
      console.log(data);

      setToken(tokenValue);
      setUserID(userIDValue);
      setLoggedIn(true);
      console.log(loggedIn);
      setLoading(false);
      navigate("/Schedule");
    } catch (error) {
      setLoginError(true);
      console.error(error);
      setLoggedIn(false);
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(false);
    setLoggedIn(false);
    setUserID(null);
  };

  const schema = z.object({
    user: z.string().min(4),
    password: z.string().min(3),
  });

  useEffect(() => {
    console.log(token);
  }, [token]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        userMessage: "Username must be at least 4 characters",
        passwordMessage: "Password must be at least 3 characters",
      });
    }
  };

  return (
    <>
      {/* {token && <div>{token}</div>}
      <p>{userID + " userid"}</p>
      <p>{"Logged ind = " + loggedIn}</p> */}
      <div className="flex justify-between  pr-10 w-full gap-5 mt-5 mx-5 items-center">
        <Link to="/Home">
          <MdArrowBack className="text-2xl text-slate-400" />
        </Link>
        <Menu className="text-2xl text-slate-400"></Menu>
      </div>
      <div className="flex flex-col gap-5 mt-20">
        <h1 className="ml-12 text-6xl font-bold text-primarycolor top-9 ">
          Believe yourself
        </h1>
        <div className="flex items-center">
          <span className="w-8 h-0 border border-black"></span>
          <p className="ml-4 font-bold text-black">Train like a pro</p>
        </div>
      </div>

      <section>
        <h2 className="ml-5 font-semibold text-lg mt-20">
          Log in with your credentials
        </h2>
        <form
          className="flex flex-col ml-5 mt-5 gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="w-80 h-12 pl-10 border border-gray rounded-3xl"
            type="text"
            placeholder="Enter your username..."
            {...register("user", { required: true, min: 4, maxLength: 20 })}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.user && (
            <div className="text-red-500">Error! {errors.user.message}</div>
          )}

          <input
            className="w-80 h-12 pl-10 border border-gray rounded-3xl"
            type="password"
            placeholder="Enter your password..."
            {...register("password", { required: true, min: 3 })}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="text-red-500">Error! {errors.password.message}</div>
          )}
          {!loggedIn ? (
            <CustomButton
              className="bg-primarycolor  font-semibold rounded-3xl w-80 h-12  mb-2"
              onClick={login}
              disabled={isSubmitting}
              type="submit"
              text={loading ? " Logger ind .." : "LOG IN"}
            />
          ) : (
            // <button
            //   onClick={login}
            //   className="bg-primarycolor font-semibold rounded-3xl w-80 h-12  mb-2"
            //   disabled={isSubmitting}
            //   type="submit"
            // >
            //   {loading ? " Logger ind .." : "LOG IN"}
            // </button>
            <button
              onClick={logout}
              className="bg-primarycolor font-semibold rounded-3xl w-80 h-12  mb-2"
              disabled={isSubmitting}
              type="button"
            >
              LOG OUT
            </button>
          )}
        </form>
        <span className="ml-14 text-red-500">
          {loginError ? "Invalid username or password" : ""}
        </span>
        {/* <CustomParagraph
          className="text-center text-blue-300"
          text="hello world"
        />
        <div>
          <CustomHeader
            className="custom-header"
            text="Welcome to my website"
            as="h2"
          />
          <CustomHeader
            className="custom-header"
            text="Another Header"
            as="h3"
          />
        </div> */}
      </section>
    </>
  );
};

export default Login;
