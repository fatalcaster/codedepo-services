import { app } from "../../app";

const createPost = async () => {
  const title = "fsgsgsgsd hjkjbnn,n, nj,nbj";
  const prize = "10.58";
  const body =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper ornare urna, sagittis dictum ipsum";
  const response = await app.inject({
    method: "POST",
    url: "/api/posts",
    cookies: { access_token: global.getAuthCookie() },
    payload: {
      title,
      prize,
      body,
    },
  });
  return response;
};

it("returns the ticket if the ticket is found", async () => {
  await createPost();
  await createPost();
  await createPost();
  await createPost();
  const postResponse = await app.inject({
    method: "GET",
    url: `/api/posts`,
  });
  expect(postResponse.statusCode).toEqual(200);
  expect(JSON.parse(postResponse.body).length).toEqual(4);
});
