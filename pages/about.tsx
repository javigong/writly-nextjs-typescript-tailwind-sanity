import Head from "next/head";
import Header from "../components/Header";

type Props = {};

const about = (props: Props) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Writly - About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className=" text-white flex flex-col items-center text-center bg-[royalblue] border-black py-20">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl font-sans font-semibold uppercase">About</h1>
          <h2 className="text-2xl">
            Every idea needs a place to start. Writly is that place.
          </h2>
        </div>
      </div>
      <div className="mt-8 p-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold">Writly: Blog Platform Project</h1>
        <p className="mt-5">
          Writly is a case study of a blog platform implemented using Next.js
          and Sanity CMS.
        </p>
        <h1 className="mt-8 text-2xl font-bold">Tech Stack</h1>
        <ul className="mt-5 list-disc pl-10">
          <li>Next.js</li>
          <li>React.js</li>
          <li>TypeScript</li>
          <li>Sanity CMS</li>
          <li>Tailwind CSS</li>
        </ul>
        <h1 className="mt-8 text-2xl font-bold">Features</h1>
        <ul className="mt-5 list-disc pl-10">
          <li>Responsive UI using Tailwind CSS.</li>
          <li>Blog content managed using Sanity CMS.</li>
          <li>Add comments to posts.</li>
          <li>Form validation.</li>
          <li>Supervised comments.</li>
          <li>
            Modern data fetching and caching techniques using Incremental Static
            Regeneration (ISR) to speed up page loading.
          </li>
          <li>Authenticated requests via token to access CMS API.</li>
          <li>User authentication via Sanity CMS.</li>
          <li>Robust code using TypeScript.</li>
        </ul>
        <h1 className="mt-8 text-2xl font-bold">
          Writly: Blog Platform Project
        </h1>
        <p className="mt-5">
          Writly is a case study of a blog platform implemented using Next.js
          and Sanity CMS.
        </p>
      </div>
    </div>
  );
};

export default about;
