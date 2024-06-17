import { TagObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export class SwaggerTag {
  static AUTH = 'Auth';
  static PROFILE = 'Profile';
  static PROFILE_IMAGE = 'Profile Image';
  static BOOK_BY_OTHER_USER = 'Book By Other User';
  static BOOK_BY_POST_AUTHOR = 'Book By Post Author';

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

  private static _bookTagObject: TagObject[] = [
    {
      name: SwaggerTag.BOOK_BY_OTHER_USER,
      description: 'Post Book By Other User API',
    },

    {
      name: SwaggerTag.BOOK_BY_POST_AUTHOR,
      description: 'Post Book By Post Author API',
    },
  ];

  static allTags: TagObject[] = [
    ...SwaggerTag._authTagObject,
    ...SwaggerTag._profileTagObject,
    ...SwaggerTag._bookTagObject,
  ];
}
