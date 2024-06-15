export abstract class SwaggerConstant {
  private static packageJson = require('../../../package.json');

  static readonly ENDPOINT = 'docs';

  static readonly VERSION = process.env.npm_package_version ?? '0.0.1';

  static readonly TITLE = 'Baca Lagi Documnetation';

  static readonly DESCRIPTION = this.packageJson.description ?? '';

  static readonly CONTACT_NAME = this.packageJson.author ?? '';

  static readonly CONTACT_URL = this.packageJson.contributors[0].url ?? '';

  static readonly CONTACT_EMAIL = this.packageJson.contributors[0].email ?? '';

  static readonly CUSTOM_CSS_URL = process.env.SWAGGER_CSS_URL;
}
