import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

type Props = {};

const contact = (props: Props) => {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch("/api/createFeedback", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Writly - Contact</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className=" text-white flex flex-col items-center text-center bg-[royalblue] border-black py-20">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl font-sans">Contact</h1>
          <h2 className="text-2xl">
            Have a question? Want to collaborate?
          </h2>
        </div>
      </div>
      <div className="mt-8 p-10 max-w-4xl mx-auto">
        {submitted ? (
          <div className="flex flex-col p-10 my-10 bg-[royalblue] text-white max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold">Thank you for your feedback!</h3>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-5  max-w-2xl mx-auto mb-10"
          >
            <h3 className="text-sm text-[royalblue]">We'd love to hear from you.</h3>
            <h4 className="text-3xl font-bold">Send us your feedback</h4>
            <hr className="py-3 mt-2" />

            <input
              {...register("_id")} // register an input
              type="hidden"
              name="_id"
              value={"contact"}
            />
            <label className="block mb-5">
              <span className="text-gray-700">Name</span>
              <input
                {...register("name", { required: true })} // register an input
                className="shadow border rounder py-2 px-3 form-input block w-full outline-none focus:bg-[royalblue]/5"
                placeholder="Name"
                type="text"
              />
            </label>
            <label className="block mb-5">
              <span className="text-gray-700">Email</span>
              <input
                {...register("email", { required: true })} // register an input
                className="shadow border rounder py-2 px-3 form-input block w-full outline-none focus:bg-[royalblue]/5"
                placeholder="user@mail.com"
                type="email"
              />
            </label>
            <label className="block mb-5">
              <span className="text-gray-700">Message</span>
              <textarea
                {...register("comment", { required: true })} // register an input
                className="shadow border rounder py-2 px-3 form-textarea block w-full outline-none focus:bg-[royalblue]/5"
                placeholder="Write here..."
                rows={8}
              />
            </label>

            {/* {errors will return when field validation fails } */}
            <div className="flex flex-col p-5">
              {errors.name && (
                <span className="text-red-500 text-sm">
                  The Name is required
                </span>
              )}
              {errors.email && (
                <span className="text-red-500 text-sm">
                  The Email is required
                </span>
              )}
              {errors.comment && (
                <span className="text-red-500 text-sm">
                  The Comment is required
                </span>
              )}
            </div>

            <input
              type="submit"
              className="shadow bg-[royalblue] hover:bg-blue-300 text-white focus:outline-none px-4 py-2 rounded cursor-pointer"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default contact;
