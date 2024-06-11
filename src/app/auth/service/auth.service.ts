import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseAdminService } from 'src/services/firebase/service/firebase-admin.service';
import { UploadHandlerService } from 'src/services/upload-handler/service/upload-handler.service';
import { MainLogger } from 'src/utils/logger/provider/main-logger.provider';
import { AuthenticateDto } from '../dto/authenticate.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: MainLogger,
    private readonly firebaseAdmin: FirebaseAdminService,
    private readonly jwtService: JwtService,
    private readonly repository: AuthRepository,
    private readonly uploadHandler: UploadHandlerService,
  ) {}

  /**
   * Authenticates a user using the provided Firebase token.
   * @param dto - The authentication DTO containing the Firebase token.
   * @returns An object containing the user registration status and access token (if user is registered).
   * @throws UnauthorizedException if the provided token is invalid.
   */
  async authenticate(dto: AuthenticateDto) {
    const decodedToken = await this._verifyFirebaseToken(dto.firebaseTokenId);

    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const isUserRegistered = await this.repository.checkUserExists(
      decodedToken.email,
    );

    let accessToken: string = null;

    if (isUserRegistered) {
      const account = await this.repository.findAccountByEmail(
        decodedToken.email,
      );

      accessToken = await this.signJwt({
        id: account.user.id,
        email: decodedToken.email,
      });
    }

    return {
      isRegistered: isUserRegistered,
      accessToken,
    };
  }

  /**
   * Registers a new user.
   *
   * @param dto - The registration data.
   * @returns An object containing the created user data and access token.
   * @throws UnauthorizedException if the provided Firebase token is invalid.
   * @throws ConflictException if the user is already registered.
   */
  async register(dto: RegisterDto) {
    const decodedToken = await this._verifyFirebaseToken(dto.firebaseTokenId);

    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const isUserRegistered = await this.repository.checkUserExists(
      decodedToken.email,
    );

    if (isUserRegistered) {
      throw new ConflictException('User already registered');
    }

    const userFirebaseData = await this._getAuthUserFirebaseData(
      decodedToken.uid,
    );

    const createdUser = await this.repository.createUser({
      email: decodedToken.email,
      googleId: decodedToken.uid,
      name: userFirebaseData.displayName,
      cityLocality: dto.city,
      phoneNumber: dto.phoneNumber,
      adminAreaLocality: dto.administrationArea,
      address: dto.address,
      avatarUrl: '',
    });

    const filePath = await this.uploadHandler.initUserImage(
      userFirebaseData.photoURL,
      decodedToken.uid,
    );

    const data = await this.repository.updateProfileImageAvatarUrl(
      createdUser.id,
      filePath,
    );

    const accessToken = await this.signJwt({
      id: data.id,
      email: data.account.email,
    });

    return {
      user: data,
      accessToken,
    };
  }

  /**
   * Signs in a user with the provided email.
   * @param email - The email of the user.
   * @returns The generated token after signing in.
   */
  private async signJwt(payloadData: { id: string; email: string }) {
    const token = this.jwtService.sign(payloadData);

    return token;
  }

  /**
   * Verifies a Firebase token.
   *
   * @param token - The Firebase token to verify.
   * @returns The decoded token if verification is successful, otherwise null.
   */
  private async _verifyFirebaseToken(token: string) {
    try {
      const decodedToken = await this.firebaseAdmin
        .getAuth()
        .verifyIdToken(token);

      return decodedToken;
    } catch (error) {
      this.logger.error(`Error verifying token: ${error}`);
      return null;
    }
  }

  /**
   * Retrieves the Firebase user data for the given UID.
   * @param uid - The UID of the user.
   * @returns The user data if found, or null if an error occurred.
   */
  private async _getAuthUserFirebaseData(uid: string) {
    try {
      const user = await this.firebaseAdmin.getAuth().getUser(uid);
      this.logger.log(`User: ${JSON.stringify(user)}`);

      return user;
    } catch (error) {
      this.logger.error(`Error getting user: ${error}`);
      return null;
    }
  }
}
