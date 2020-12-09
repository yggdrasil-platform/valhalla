// import jwt, { RequestHandler } from 'express-jwt';
//
// /**
//  * Convenience middleware that simply wraps around the Auth0 JWT auth middleware.
//  */
// export default async function checkUserJwt(): Promise<void> {
//   return jwt({
//     algorithms: ['HS256'],
//     requestProperty: 'auth',
//     secret: process.env.AUTH_SECRET_KEY,
//   }).apply(this, arguments); // eslint-disable-line prefer-rest-params
// }
