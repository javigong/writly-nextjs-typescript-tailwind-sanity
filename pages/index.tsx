import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";

const Home: NextPage = () => {
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
    </div>
  );
};

export default Home;

// export const getServerSideProps = async (context) => {
  
// }