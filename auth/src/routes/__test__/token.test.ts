import { app } from "../../app";
import jwt from "jsonwebtoken";
import { Privileges } from "@milovicvtickets/common";

it("returns 401 when refresh token doesn't exist", async () => {
  // await global.getAuthCookie();

  const response = await app.inject({
    method: "GET",
    url: "/api/users/token",
  });

  expect(response.statusCode).toEqual(401);
});

it("returns 401 when refresh token isn't valid", async () => {
  const refresh_token = jwt.sign(
    {
      username: "fdsfsdf",
      id: "fert34t3",
      privileges: Privileges.admin,
    },
    "fsdfdsjfhsdj"
  );

  const response = await app.inject({
    method: "GET",
    url: "/api/users/token",
    cookies: {
      refresh_token: refresh_token,
    },
  });

  expect(response.statusCode).toEqual(401);
});

it("creates new  refresh and access token when refresh token exists", async () => {
  const cookie = (await global.getAuthCookie()) as {
    name: string;
    value: string;
  }[];

  const response = await app.inject({
    method: "GET",
    url: "/api/users/token",
    cookies: {
      [cookie[0].name]: cookie[0].value,
      [cookie[1].name]: cookie[1].value,
    },
  });

  expect(response.statusCode).toEqual(200);
});
