import axios from "axios";
import { NextApiRequest } from "next";

function buildClient({ req }: { req: NextApiRequest }) {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  }
  return axios.create({
    baseURL: "/",
  });
}

export default buildClient;
