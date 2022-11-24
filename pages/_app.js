import Head from "next/head";
import "../styles/Navbar.css";
import "../styles/globals.css";
import Script from "next/script";
import { SSRProvider } from "react-bootstrap";
import UnsupportedMediaSize from "../components/UnsupportedMediaSize";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SSRProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/icon-logo.ico" />
        </Head>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" />
        <UnsupportedMediaSize />
        <div className=" d-none d-sm-block d-md-block">
          <Component {...pageProps} />
        </div>
      </SSRProvider>
    </>
  );
}

export default MyApp;
