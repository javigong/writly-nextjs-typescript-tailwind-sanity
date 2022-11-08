import PortableText from "react-portable-text";
import { GetStaticProps } from "next";
import Image from "next/image";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
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
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500">{post.description}</h2>
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
                  <p className="mb-5"> {props.children}</p>
              ),
                h1: (props: any) => {
                  <h1 className="text-2xl font-bold my-5" {...props} />;
                },
                h2: (props: any) => {
                  <h2 className="text-xl font-bold my-5" {...props} />;
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
    'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
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
