import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [showStatusPswrd, setShowStatusPswrd] = useState(false);
  const [showStatusCnfrmPswrd, setShowCnfrmStatusPswrd] = useState(false);

  const togglePassword = () => {
    setShowStatusPswrd(!showStatusPswrd);
  };

  const toggleConfirmPassword = () => {
    setShowCnfrmStatusPswrd(!showStatusCnfrmPswrd);
  };

  // Data Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  // Data Form End

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (confirmpassword !== password) {
      toast.error("Password is not the same");
    } else {
      try {
        const dataForm = {
          name,
          email,
          password,
          confirmpassword,
        };
        await axios.post(`http://localhost:5000/api/register`, dataForm);
        toast.success("Registration successful");
        router.push("/login"); // Redirect to login page
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="grid grid-rows-[1fr,3fr] lg:grid-rows-1 lg:grid-cols-2 h-screen overflow-hidden bg-primary font-quickSand">
      {/* Left */}
      <div className="lg:relative flex justify-center items-center lg:rounded-br-[90px]">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-3">
          <h1 className="lg:order-2 text-3xl lg:text-5xl font-bold text-white">
            Tech<span className="text-secondary"> Universe</span>
          </h1>
        </div>
        <div className="hidden lg:block lg:absolute bottom-0 right-0 h-[80px] w-[80px] bg-white"></div>
        <div className="hidden lg:block lg:absolute bottom-0 right-0 h-[80px] w-[80px] bg-primary rounded-br-[90px] "></div>
      </div>
      {/* Left End */}

      {/* Right */}
      <div className="bg-white flex flex-col justify-center px-8 lg:px-20 rounded-tl-[90px]">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">Daftar</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Nama Input */}
          <div className="relative w-full flex items-center">
            <img
              src="/person_icon.svg"
              alt=""
              className="absolute left-3 w-[18px] opacity-50"
            />
            <input
              type="text"
              name="namalengkap"
              id="namalengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Lengkap"
              className="px-8 py-2 w-full border border-slate-400 rounded-xl font-medium outline-none transition placeholder:text-sm placeholder:transition placeholder:duration-500 focus:placeholder:-translate-y-48 focus:border-secondary"
            />
          </div>
          {/* Nama Input End*/}

          {/* Email Input */}
          <div className="relative w-full flex items-center">
            <img
              src="/email_icon.svg"
              alt=""
              className="absolute left-3 w-[18px] opacity-50"
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="px-8 py-2 w-full border border-slate-400 rounded-xl font-medium outline-none transition placeholder:text-sm placeholder:transition placeholder:duration-500 focus:placeholder:-translate-y-48 focus:border-secondary"
            />
          </div>
          {/* Email Input End*/}

          {/* Password Input */}
          <div className="relative flex items-center">
            <img
              src="/password_icon.svg"
              alt=""
              className="absolute left-3 w-[18px] opacity-50"
            />
            <input
              type={showStatusPswrd ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="px-8 py-2 w-full border border-slate-400 rounded-xl font-medium outline-none transition placeholder:text-sm placeholder:transition placeholder:duration-500 focus:placeholder:-translate-y-48 focus:border-secondary"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3"
            >
              <img
                src={
                  showStatusPswrd
                    ? "/show_password_off_icon.svg"
                    : "/show_password_icon.svg"
                }
                alt=""
                className="w-[20px] opacity-50"
              />
            </button>
          </div>
          {/* Password Input End */}

          {/* Confirm Password Input*/}
          <div className="relative flex items-center">
            <img
              src="/password_icon.svg"
              alt=""
              className="absolute left-3 w-[18px] opacity-50"
            />
            <input
              type={showStatusCnfrmPswrd ? "text" : "password"}
              name="password"
              id="password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              placeholder="Password"
              className="px-8 py-2 w-full border border-slate-400 rounded-xl font-medium outline-none transition placeholder:text-sm placeholder:transition placeholder:duration-500 focus:placeholder:-translate-y-48 focus:border-secondary"
            />
            <button
              type="button"
              onClick={toggleConfirmPassword}
              className="absolute right-3"
            >
              <img
                src={
                  showStatusCnfrmPswrd
                    ? "/show_password_off_icon.svg"
                    : "/show_password_icon.svg"
                }
                alt=""
                className="w-[20px] opacity-50"
              />
            </button>
          </div>
          {/* Confirm Password End */}

          {/* Button Submit */}
          <button
            type="submit"
            className="bg-primary py-3 rounded-xl text-white text-sm font-medium"
          >
            Daftar
          </button>
          {/* Button Submit End */}
        </form>

        <p className="self-center my-2 font-bold">Or</p>
        <p className="self-center mt-1 text-sm font-medium">
          Sudah punya akun?{" "}
          <Link href="/login" className="underline font-bold text-primary">
            Masuk di sini
          </Link>
        </p>
      </div>
      {/* Right End */}
      <ToastContainer />
    </div>
  );
};

export default Register;
