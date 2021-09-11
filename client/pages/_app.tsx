import "../styles/globals.scss";
import buildClient from "../api/build-client";
import { NavBar } from "../components/NavBar/NavBar";
import Head from "next/head";

const AppComponent = ({ Component, pageProps, currentUser }: any) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto"
        />
      </Head>
      <NavBar
        currentUser={currentUser}
        notifications={["test", "test", "test", "test"]}
      />
      <div className="body-container">
        <Component {...pageProps} />
      </div>
    </>
  );
};

AppComponent.getInitialProps = async (appContext: any) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
