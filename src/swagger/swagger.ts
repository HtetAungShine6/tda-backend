import { INestApplication } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { swaggerConfig } from "./swagger.config";

export function setupSwagger(app: INestApplication) {
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger-json',
      swaggerOptions: {
        operationsSorter: 'method',
      }
  });
}

