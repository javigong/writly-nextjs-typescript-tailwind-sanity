import { GetStaticProps } from "next";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PortableText from "react-portable-text";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch("/api/createComment", {
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
    <main>
      <Header />

      <Image
        className="w-full h-80 object-cover"
        width={256}
        height={256}
        src={urlFor(post.mainImage).url()!}
        alt="Post Image"
      />

      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-1">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-3">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <Image
            className="h-10 w-10 rounded-full object-cover"
            width={256}
            height={256}
            src={urlFor(post.author.image).url()!}
            alt="Author Image"
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <span className="text-[royalblue] font-semibold">
              {post.author.name}
            </span>{" "}
            - Published at {new Date(post._createdAt).toLocaleString("en-CA")}
          </p>
        </div>

        <div>
          <div className="mt-10">
            <PortableText
              className=""
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
              serializers={{
                normal: (props: any) => (
                  <p className="my-5"> {props.children}</p>
                ),
                h1: (props: any) => {
                  <h1 className="text-2xl my-5" {...props} />;
                },
                h2: (props: any) => {
                  <h2 className="text-xl my-5" {...props} />;
                },
                li: ({ children }: any) => {
                  <li className="ml-4 list-disc">{children}</li>;
                },
                link: ({ href, children }: any) => {
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>;
                },
              }}
            />
          </div>
        </div>
      </article>

      <hr className="max-w-lg my-5 mx-auto border border-[royalblue]" />

      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-[royalblue] text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">Thank you for your comment!</h3>
          <p>It will be published after approval.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5  max-w-2xl mx-auto mb-10"
        >
          <h3 className="text-sm text-[royalblue]">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment</h4>
          <hr className="py-3 mt-2" />

          <input
            {...register("_id")} // register an input
            type="hidden"
            name="_id"
            value={post._id}
          />
          <label className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register("name", { required: true })} // register an input
              className="shadow border rounder py-2 px-3 form-input block w-full outline-none focus:bg-[royalblue]/5"
              placeholder="John Doe"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register("email", { required: true })} // register an input
              className="shadow border rounder py-2 px-3 form-input block w-full outline-none focus:bg-[royalblue]/5"
              placeholder="john.doe@gmail.com"
              type="email"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Comment</span>
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
              <span className="text-red-500 text-sm">The Name is required</span>
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

      {/* Comments */}

      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-[royalblue] shadow space-y-2">
        <h3 className="text-3xl">Comments</h3>
        <hr className="pb-2" />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p><span className="text-[royalblue]">{comment.name}</span>: {comment.comment}</p>

          </div>
        ))}
      </div>
    </main> 
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
    }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // after 60 seconds, Next.js will attempt to re-generate the page
  };
};
