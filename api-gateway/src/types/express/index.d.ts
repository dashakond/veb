// src/types/express/index.d.ts
import { Role } from '../../auth/roles.enum'; // або свій enum/тип

declare global {
  namespace Express {
    interface Request {
      user?: {
        roles: Array<{ value: string }>;
        [key: string]: any;
      };
    }
  }
}
