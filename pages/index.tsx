import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

type Props = {
  posts: Post[];
};

const Home = ({ posts }: Props) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Writly - Your Blog Service</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className=" text-white flex justify-between items-center bg-[royalblue] border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-sans">
            <span className="font-semibold uppercase">Writly</span> is a place
            to write, read, and connect
          </h1>
          <h2>
            It's easy and fre to post our thinking on any topic and connect with
            millions of readers.
          </h2>
        </div>

        <div className="hidden md:inline-flex h-90 lg:h-[full]">
          <Image
            src="/writly-bg-black-square.svg"
            width={555}
            height={555}
            alt="Writly"
          />
        </div>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 ">
        {posts.map((post) => (
          <Link key={post._id} href={`post/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <Image
                className="h-60 w-full object-cover group-hover:scale-105 transition duration-200 ease-in-out"
                width={500}
                height={500}
                src={urlFor(post.mainImage).url()!}
                alt="Post Main Image"
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <p className="text-sm">
                    {post.description}
                    <br />
                    by {post.author.name}
                  </p>
                </div>
                <div className="h-12 w-12">
                  <Image
                    className="rounded-full"
                    width={86}
                    height={86}
                    src={urlFor(post.author.image).url()!}
                    alt="Post Main Image"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"] {
  
    _id,
    title,
    author-> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
