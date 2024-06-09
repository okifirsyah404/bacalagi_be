import * as firebaseAdmin from 'firebase-admin';
import { AppOptions } from 'firebase-admin';

export type FirebaseAdminModuleOptions = {
  credential?: string | firebaseAdmin.ServiceAccount;
} & Omit<AppOptions, 'credential'>;

export interface FirebaseAdminModuleAsyncOptions {
  imports: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<FirebaseAdminModuleOptions> | FirebaseAdminModuleOptions;
  inject?: any[];
}
