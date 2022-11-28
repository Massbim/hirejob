import Head from "next/head";
import { Fragment } from "react";
import styles from "../styles/Home.module.css";
import Banner from "../components/Header/Banner";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { loadBanner } from "./api";

// export async function getStaticProps() {
//   const detail = await loadBanner();
//   return { props: { detail } };
// }

export default function Home({ detail }) {
  return (
    <Fragment>
      <div className={`${styles.container}`}>
        <Head>
          <title>Peworld - Landing Page</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/icon-logo.ico" />
        </Head>
        <Navbar />
        <Banner data={detail} />
      </div>
      <Footer />
    </Fragment>
  );
}
