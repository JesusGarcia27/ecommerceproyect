import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, logOut } from "../store/slices/userInfo.slice";


const Login = () => {
  const { register, handleSubmit } = useForm();

  const {token, user} = useSelector((store) => store.userInfo)

  const dispatch = useDispatch()

  const submit = (data) => {
    dispatch(loginUser(data))
  };

  const handleClickLogout = () => {
    dispatch(logOut());
  };
 
  return (
    <main className="bg-gray-200 grid place-content-center px-2 mt-10 dark:bg-black/90">

      {
        token ? (
          <section className="bg-white p-4 rounded-lg w-[300px] text-center grid gap-4 dark:bg-black">
            <i className='bx bx-user text-7xl'></i>
            <h3 className="capitalize">{user?.firtstName} {user?.lastName} </h3>
            <button onClick={handleClickLogout} className="bg-blue-700 text-white py-2 rounded-lg block w-full hover:bg-blue-300">Logout</button>
          </section>
        ) : (
          <form
        onSubmit={handleSubmit(submit)}
        className="bg-white p-4 rounded-lg max-w-[320px] grid gap-4 dark:bg-black/90"
      >
        <h2 className="text-2xl font-semibold">
          Welcome! Enter your email and password to continue...
        </h2>

        <section className="bg-cyan-300/30 p-4 rounded-lg py-2">
          <h3 className="text-center font-bold">Test data</h3>

          <div className="flex gap-2 items-center">
            <i className="bx bx-envelope text-xl"></i>
            <span>john@gmail.com</span>
          </div>
          <div className="flex gap-2 items-center">
            <i className="bx bx-lock-alt text-xl"></i>
            <span>john1234</span>
          </div>
        </section>

        <div className="grid gap-1">
          <label className="" htmlFor="email">Email</label>
          <input
            className="border-[1px] border-gray-300 p-1 outline-none rounded-lg dark:bg-gray-500"
            id="email"
            type="email"
            {...register("email", {
              required: true,
            })}
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="password">Password</label>
          <input
            className="border-[1px] border-gray-300 p-1 outline-none rounded-lg dark:bg-gray-500"
            id="password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
        </div>

        <button className="block w-full py-2 bg-blue-700 text-white hover:bg-blue-400 transition-colors rounded-lg ">
          Login
        </button>

        <span className="text-xs">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="#">
            Sign up
          </Link>
        </span>
      </form>
        )
      }

      
    </main>
  );
};

export default Login;
