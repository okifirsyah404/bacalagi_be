import { TagObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export class SwaggerTag {
  static AUTH = 'Auth';
  static PROFILE = 'Profile';
  static PROFILE_IMAGE = 'Profile Image';

  private static _authTagObject: TagObject[] = [
    {
      name: SwaggerTag.AUTH,
      description: 'Auth API',
    },
  ];

  private static _profileTagObject: TagObject[] = [
    {
      name: SwaggerTag.PROFILE,
      description: 'Profile API',
    },
    {
      name: SwaggerTag.PROFILE_IMAGE,
      description: 'Profile Image API',
    },
  ];

  static allTags: TagObject[] = [
    ...SwaggerTag._authTagObject,
    ...SwaggerTag._profileTagObject,
  ];
}
