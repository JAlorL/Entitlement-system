import { User } from "../database/user";

declare global {
  namespace Express {
    interface Request {
      auth?: User;
    }
  }
}
