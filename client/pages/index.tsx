import axios from "axios";

import React from "react";
import buildClient from "../api/build-client";
import ErrorBar from "../components/Error/ErrorBar";

const LandingPage = ({ currentUser }: any) => {
  console.log(currentUser);
  if (!currentUser) {
    return (
      <div>
        <h1>Logged out</h1>
        <a href="/auth/signin">Sign In</a>
      </div>
    );
  }
  return (
    <>
      <h1>Logged in</h1>
      <a href="/auth/signout">Sign Out</a>
    </>
  );
};

LandingPage.getInitialProps = async (context: any) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  console.log(data);

  return data;
};

export default LandingPage;
