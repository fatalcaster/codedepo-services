import {
  RequestValidationError,
  ValidationError,
} from "@milovicvtickets/common";
import { FastifyRequest } from "fastify";
import { UserData } from "../types/user";
import { getDeviceFingerprint } from "./deviceFingerprint";

function isEmail(str: string) {
  if (!str || typeof str !== "string" || str.length > 40) return false;
  const regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return regex.test(str);
}

export function isPassword(str: string) {
  if (!str || typeof str !== "string" || str.length > 25) return false;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(str);
}

function isGithubUsername(str: string) {
  if (!str || typeof str !== "string" || str.length > 39) return false;
  const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  return regex.test(str);
}

export function verifyUserData(
  data: UserData | undefined,
  request: FastifyRequest
): (UserData & { sessionId: string }) | never {
  const errors: ValidationError[] = [];
  if (!data) {
    throw new Error();
  }
  if (!isEmail(data.email)) {
    errors.push({
      param: "email",
      msg: "Invalid Email",
      value: data.email,
    });
  }
  if (!isGithubUsername(data.username)) {
    errors.push({
      param: "username",
      msg: "Invalid Username",
      value: data.username,
    });
  }
  if (errors.length) throw new RequestValidationError(errors);

  const sessionId = getDeviceFingerprint(request);

  const verifiedData = {
    username: data.username,
    git_id: data.git_id,
    email: data.email,
    sessionId,
  };

  return verifiedData;
}
