import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConstant } from './swager.constant';
import { SwaggerTag } from './swagger-tag';

export default async function swaggerDocumentBuilder(
  app: INestApplication<any>,
) {
  const documentBuilder = new DocumentBuilder()
    .setTitle(SwaggerConstant.TITLE)
    .setDescription(SwaggerConstant.DESCRIPTION)
    .setVersion(SwaggerConstant.VERSION)
    .addBearerAuth()
    .setContact(
      SwaggerConstant.CONTACT_NAME,
      SwaggerConstant.CONTACT_URL,
      SwaggerConstant.CONTACT_EMAIL,
    )
    .build();

  documentBuilder.tags = SwaggerTag.allTags;

  const document = SwaggerModule.createDocument(app, documentBuilder, {
    deepScanRoutes: true,
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    extraModels: [],
  });

  SwaggerModule.setup(SwaggerConstant.ENDPOINT, app, document, {
    customSiteTitle: SwaggerConstant.TITLE,
    customCssUrl: SwaggerConstant.CUSTOM_CSS_URL,
  });
}
