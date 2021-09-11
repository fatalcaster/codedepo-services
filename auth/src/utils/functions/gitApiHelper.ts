import {
  NotAuthorizedError,
  Privileges,
  RequestValidationError,
} from "@milovicvtickets/common";
import axios from "axios";
import { User } from "../../models/user";
import { UserData } from "../types/user";

export async function getGithubUserData(
  access_token: string
): Promise<UserData | undefined> {
  const email = await getGithubEmail(access_token);
  const { data } = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: "token " + access_token,
    },
  });
  if (!data.id || !data.login || !email) {
    return undefined;
  }
  const user = await User.findOne({ git_id: data.id });
  if (
    user?.privileges === Privileges.blocked ||
    user?.privileges === Privileges.suspended
  ) {
    throw new NotAuthorizedError();
  }
  return {
    git_id: data.id,
    username: data.login,
    email: email,
  };
}

async function getGithubEmail(
  access_token: string
): Promise<string | undefined> {
  const email = await axios.get("https://api.github.com/user/emails", {
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-us",
      Authorization: `token ${access_token}`,
    },
  });
  return email.data[0].email;
}

export async function getGitAccessToken(code: string): Promise<string | never> {
  const res = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  const { access_token } = res.data;

  if (!access_token) {
    throw new RequestValidationError([
      {
        param: "access_token",
        value: undefined,
        msg: "Invalid access token",
      },
    ]);
  }
  return access_token;
}
