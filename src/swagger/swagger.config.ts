import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle('TDA API')
  .setDescription('Use the base API URL as http://localhost:3000')
  .setVersion('1.0')
  .setLicense(
    'MIT License',
    'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
  )
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    },
    'bearer-token',
  )
  .build()