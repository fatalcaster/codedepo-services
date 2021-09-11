// import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
// import { Server, IncomingMessage, ServerResponse } from "http";
// import { RequestValidationError } from "@milovicvtickets/common";
// import { DatabaseConnectionError } from "@milovicvtickets/common";
// import { ValidationError } from "@milovicvtickets/common";

// function signUpRouter(
//   app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
//   _options: any,
//   done: any
// ) {
//   app.post(
//     "/api/users/signup",
//     {
//       preValidation: signUpValidation,
//     },
//     async (_request: RequestType, _reply: FastifyReply) => {
//       throw new DatabaseConnectionError();
//     }
//   );

//   done();
// }

// const signUpValidation = (
//   request: RequestType,
//   _reply: FastifyReply,
//   done: any
// ) => {
//   const { username, email } = request.body;
//   const errors: ValidationError[] = [];

//   if (!isEmail(email)) {
//     errors.push({
//       param: "email",
//       msg: "Invalid Email",
//       value: email,
//     });
//   }

//   if (!isGithubUsername(username)) {
//     errors.push({
//       param: "username",
//       msg: "Invalid Username",
//       value: username,
//     });
//   }

//   if (errors.length) {
//     throw new RequestValidationError(errors);
//   }

//   done(undefined);
// };

// type BodyType = {
//   username: string;
//   email: string;
// };
// type RequestType = FastifyRequest<{ Body: BodyType }>;

// export { signUpRouter };
