import { Request as ExpressRequest } from 'express';

interface Request extends ExpressRequest {
  auth?: string;
}

export default Request;
