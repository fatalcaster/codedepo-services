import { Answer } from "../../models/answer";
import { Post } from "../../models/post";
import { app } from "./../../app";
import mongoose from "mongoose";

it("has a route handler listening to /api/posts for post requests", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/api/posts",
    payload: {},
  });
  expect(response.statusCode).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/api/posts",
    payload: {},
  });

  expect(response.statusCode).toEqual(401);
});

it("returns status other than 401 the user is signed in", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/api/posts",
    cookies: { access_token: global.getAuthCookie() },
    payload: {},
  });
  expect(response.statusCode).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  {
    const response = await app.inject({
      method: "POST",
      url: "/api/posts",
      cookies: { access_token: global.getAuthCookie() },
      payload: {
        title: "",
        prize: 10,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper ornare urna, sagittis dictum ipsum",
      },
    });
    expect(response.statusCode).toEqual(400);
  }
  {
    const response = await app.inject({
      method: "POST",
      url: "/api/posts",
      cookies: { access_token: global.getAuthCookie() },
      payload: {
        prize: 10,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper ornare urna, sagittis dictum ipsum",
      },
    });
    expect(response.statusCode).toEqual(400);
  }
});

it("returns an error if an invalid prize is provided", async () => {
  {
    const response = await app.inject({
      method: "POST",
      url: "/api/posts",
      cookies: { access_token: global.getAuthCookie() },
      payload: {
        title: "reghertjhkjhkjm,m m,nmgre",
        prize: -10,
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper ornare urna, sagittis dictum ipsum",
      },
    });
    expect(response.statusCode).toEqual(400);
  }
  {
    const response = await app.inject({
      method: "POST",
      url: "/api/posts",
      cookies: { access_token: global.getAuthCookie() },
      payload: {
        title: "fsgsgsklhjl jkhjlhhgsd",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ullamcorper ornare urna, sagittis dictum ipsum",
      },
    });
    expect(response.statusCode).toEqual(400);
  }
});

it("returns an error if an invalid body is provided", async () => {
  {
    const response = await app.inject({
      method: "POST",
      url: "/api/posts",
      cookies: { access_token: global.getAuthCookie() },
      payload: {
        title: "reghertjhkjhkjm,m m,nmgre",
        prize: "10",
        body: "Lo",
      },
    });
    expect(response.statusCode).toEqual(400);
  }
  {
    const response = await app.inject({
      method: "POST",
      url: "/api/posts",
      cookies: { access_token: global.getAuthCookie() },
      payload: {
        title: "fsgsgsklhjl jkhjlhhgsd",
        prize: "10.58",
      },
    });
    expect(response.statusCode).toEqual(400);
  }
});

it("returns an error if body of the answer is invalid", async () => {
  const { body, postId } = await createValidPost();
  let answers = await Answer.find({ postId: postId });
  if (answers) expect(answers.length).toEqual(0);

  const answer = await app.inject({
    method: "POST",
    url: `/api/posts/${postId}`,
    cookies: { access_token: global.getAuthCookie() },
    payload: {
      body,
    },
  });
  expect(answer.statusCode).toEqual(201);
  answers = await Answer.find({ postId: postId });
  if (answers) expect(answers.length).toEqual(1);
});

it("returns 404 if the parent post is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const answer = await app.inject({
    method: "POST",
    url: `/api/posts/${id}`,
    cookies: { access_token: global.getAuthCookie() },
    payload: {
      body: "fdgnsljgnljnfsjdnfasd ljfndsjlfnsdkfjndskfjnsd",
    },
  });
  expect(answer.statusCode).toEqual(404);
});

it("creates a post with valid inputs", async () => {
  let posts = await Post.find({});
  expect(posts.length).toEqual(0);

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
  expect(response.statusCode).toEqual(201);
  posts = await Post.find({});
  expect(posts.length).toEqual(1);
  expect(posts[0].prize).toEqual(prize);
  expect(posts[0].title).toEqual(title);
  expect(posts[0].body).toEqual(body);
});

it("creates a valid answer to the post", async () => {
  const { postId } = await createValidPost();
  const answer = await app.inject({
    method: "POST",
    url: `/api/posts/${postId}`,
    cookies: { access_token: global.getAuthCookie() },
    payload: {
      body: "fdgnsljgnljnfsjdnfasd ljfndsjlfnsdkfjndskfjnsd",
    },
  });
  expect(answer.statusCode).toEqual(201);
});

const createValidPost = async () => {
  let posts = await Post.find({});
  expect(posts.length).toEqual(0);

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
  expect(response.statusCode).toEqual(201);
  posts = await Post.find({});
  expect(posts.length).toEqual(1);
  expect(posts[0].prize).toEqual(prize);
  expect(posts[0].title).toEqual(title);
  expect(posts[0].body).toEqual(body);
  return { title, prize, body, postId: JSON.parse(response.body).id };
};
