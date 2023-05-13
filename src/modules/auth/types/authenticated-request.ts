import { Request } from 'express';
import { Account } from '@/modules/account/schemas/account.schema';

export interface AuthenticatedRequest extends Request {
  user: Account;
}