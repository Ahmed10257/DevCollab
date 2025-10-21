import { NestFactory } from '@nestjs/core';
import {
FastifyAdapter,
NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { CatchEverythingFilter } from './exception-filter/global-exception-filter';

async function bootstrap() {
const app = await NestFactory.create<NestFastifyApplication>(
AppModule,
// Use Fastify as the HTTP adapter
new FastifyAdapter({ logger: true }),
{ bufferLogs: false },
);

// Enable CORS
app.enableCors({
// origin: 'http://localhost:4200',
origin: ['*','172.20.5.123:4200'],
methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
credentials: true,
});

// Enable Pino logger
app.useLogger(app.get(Logger));

// Enable Global Exception Filter
app.useGlobalFilters(new CatchEverythingFilter(app.get(Logger)));

// Enable Global Validation Pipe
app.useGlobalPipes(
new ValidationPipe({
transform: true,
whitelist: true,
}),
);

// Swagger config (Fastify-compatible)
const config = new DocumentBuilder()
.setTitle('DevCollab API')
.setDescription('API docs')
.setVersion('1.0')
.addBearerAuth()
.build();

const doc = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/api', app, doc);

await app.listen(3000, '0.0.0.0');
}
bootstrap();
