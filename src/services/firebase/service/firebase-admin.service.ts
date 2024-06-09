import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { MainLogger } from 'src/utils/logger/provider/main-logger.provider';
import { FirebaseConstants } from '../constant/firebase.constant';
import { FirebaseAdminModuleOptions } from '../interface/firebase-admin-option.interface';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  private app: admin.app.App;

  private logger = new MainLogger(FirebaseAdminService.name);

  constructor(
    @Inject(FirebaseConstants.FIREBASE_ADMIN_OPTIONS)
    private options: FirebaseAdminModuleOptions,
  ) {}

  onModuleInit() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(this.options.credential),
      databaseURL: this.options.databaseURL,
    });
    this.logger.log('Firebase Admin Initialized');
  }

  getAuth(): admin.auth.Auth {
    return this.app.auth();
  }

  getFirestore(): FirebaseFirestore.Firestore {
    return this.app.firestore();
  }

  getDatabase(): admin.database.Database {
    return this.app.database();
  }
}
