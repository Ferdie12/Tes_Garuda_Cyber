import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showStatus, setShowStatus] = useState(false);

  const togglePassword = () => {
    setShowStatus(!showStatus);
  };

  // Data Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Data Form End

  const router = useRouter();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const dataForm = {
        email,
        password,
      };

      const response = await axios.post(`http://localhost:5000/api/login`, dataForm);

      axios.defaults.headers.common["authorization"] = response.data.data;
      Cookies.set("token", response.data.data, {
        expires: 1
      });

      Cookies.set("name", response.data.name, {
        expires: 1
      })

      Cookies.remove("user_id");

      toast.success("Login successful");
      router.push("http://localhost:3000/"); // Redirect to desired page
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="grid grid-rows-[1fr,3fr] lg:grid-rows-1 lg:grid-cols-2 h-screen overflow-hidden bg-primary font-quickSand">
      {/* Left */}
      <div className="lg:relative flex justify-center items-center lg:rounded-br-[90px]">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-3">
          <h1 className="lg:order-2 text-5xl font-bold text-white">
            Tech<span className="text-secondary"> Universe</span>
          </h1>
        </div>
        <div className="hidden lg:block lg:absolute bottom-0 right-0 h-[100px] w-[100px] bg-white"></div>
        <div className="hidden lg:block lg:absolute bottom-0 right-0 h-[100px] w-[100px] bg-primary rounded-br-[90px] "></div>
      </div>
      {/* Left End */}

      {/* Right */}
      <div className="bg-white flex flex-col justify-center px-14 lg:px-20 rounded-tl-[90px]">
        <h1 className="text-2xl font-bold mb-6">Masuk</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Email Input */}
          <div className="relative w-full flex items-center mb-4">
            <img
              src="/email_icon.svg"
              alt=""
              className="absolute left-3 w-[20px] opacity-50"
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="px-10 py-2 w-full border border-slate-400 rounded-xl font-medium outline-none transition placeholder:text-sm placeholder:transition placeholder:duration-500 focus:placeholder:-translate-y-48 focus:border-secondary"
            />
          </div>
          {/* Email Input End*/}

          {/* Password Input*/}
          <div className="relative flex items-center">
            <img
              src="/password_icon.svg"
              alt=""
              className="absolute left-3 w-[20px] opacity-50"
            />
            <input
              type={showStatus ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="px-10 py-2 w-full border border-slate-400 rounded-xl font-medium outline-none transition placeholder:text-sm placeholder:transition placeholder:duration-500 focus:placeholder:-translate-y-48 focus:border-secondary"
            />

            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3"
            >
              <img
                src={
                  showStatus
                    ? "/show_password_off_icon.svg"
                    : "/show_password_icon.svg"
                }
                alt=""
                className="w-[20px] opacity-50"
              />
            </button>
          </div>
          {/* Password Input End */}

          <button
            type="submit"
            className="mt-5 bg-primary py-3 rounded-xl text-white text-sm font-medium"
          >
            Masuk
          </button>
          {/* Button Submit End */}
        </form>

        <p className="self-center my-2 text-sm font-bold">Or</p>

        <p className="self-center text-sm font-medium">
          Belum punya akun?{" "}
          <Link href="/register" className="underline font-bold text-primary">
            Daftar di sini
          </Link>
        </p>
      </div>
      {/* Right End */}
      <ToastContainer />
    </div>
  );
};

export default Login;
