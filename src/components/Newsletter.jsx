import { React, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

function Newsletter() {
  const [email, setEmail] = useState("");
  const error = () => toast.error("Error occured!");
  const success = () => toast.success("Successfully sent!");
  const form = useRef();

  const changeSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      error();
    } else {
      success();

      emailjs
        .sendForm(
          "service_97te2x4",
          "template_p5ls11n",
          form.current,
          "rBHPqsGP1vYUCEoP9"
        )
        .then(
          (result) => {
            console.log(result.text);
            console.log("sent");
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
    setEmail("");
  };

  return (
    <div className="pt-10 text-center space-y-[10px]">
      <h3>Subscribe to my newsletter and get trending news about tech</h3>
      <form ref={form} onSubmit={changeSubmit} className="lg:space-x-[20px] md:space-x-[15px] space-y-[15px] lg:space-y-0 md:space-y-0  lg:inline-flex w-full items-center justify-center">
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-black px-6 py-3 rounded-md md:w-[200px] w-[300px] lg:w-[300px]"
        />
        <button className="bg-black text-white md:px-4 px-6 py-3 w-[300px] lg:w-[130px] md:w-[90px] rounded-md hover:opacity-75 transistion-all duration-300">
          Subcribe
        </button>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
            role: "status",
            ariaLive: "polite",
          }}
        />
      </form>
    </div>
  );
}

export default Newsletter;
