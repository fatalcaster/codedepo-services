import { app } from "../../app";

it("clears the cookie after signing out", async () => {
  await global.getAuthCookie();

  const response = await app.inject({
    method: "POST",
    url: "/api/users/signout",
  });

  expect(response.statusCode).toEqual(200);
});
