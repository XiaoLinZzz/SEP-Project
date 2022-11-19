import { Express } from "express";

declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string;
        companyId: string;
      };
      ability: any; // TODO: Remove this any
    }
  }
}
