import { Privileges } from "@milovicvtickets/common";
import jwt from "jsonwebtoken";

function generateJWT(
  data: {
    id: string;
    username: string;
    privileges: Privileges;
    sessionId: string;
  },
  accessExpiration?: number
) {
  const token = {
    id: data.id,
    sessionId: data.sessionId,
    username: data.username,
    privileges: data.privileges,
  };
  const access_token = jwt.sign(token, process.env.JWT_ACCESS_TOKEN!, {
    expiresIn: accessExpiration || 1200,
  });
  const refresh_token = jwt.sign(token, process.env.JWT_REFRESH_TOKEN!, {
    expiresIn: "7d",
  });

  const hash = getTokenHash(refresh_token);

  return { access_token, refresh_token, hash };
}

export function getTokenHash(token: string) {
  return token.substr(token.length - 43);
}

export default generateJWT;
