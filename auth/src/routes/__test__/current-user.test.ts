import { app } from "./../../app";

it("responds with details about the current user", async () => {
  const cookie = (await global.getAuthCookie()) as {
    name: string;
    value: string;
  }[];

  const response = await app.inject({
    method: "GET",
    url: "/api/users/currentuser",
    cookies: {
      [cookie[0].name]: cookie[0].value,
      [cookie[1].name]: cookie[1].value,
    },
  });

  console.log(`\n\n${response.body}`);

  expect(JSON.parse(response.body).currentUser?.username).toEqual("testerica");
});

it("responds with null", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/users/currentuser",
  });
  expect(JSON.parse(response.body).currentUser).toEqual(null);
});
