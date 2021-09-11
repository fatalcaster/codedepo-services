import { useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default () => {
  const { doRequest } = useRequest({
    url: "/api/users/get_token",
    method: "get",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you in...</div>;
};
