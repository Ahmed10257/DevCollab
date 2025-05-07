import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

// We use the `JwtModuleOptions` type from `@nestjs/jwt` to define the return type of the factory function. 
// This allows us to specify the secret and expiration time for the JWT tokens.
// We also use the `registerAs` function from `@nestjs/config` to create a configuration 
// provider for the JWT module. This is like creating a namespace for our configuration, 
// allowing us to group related settings together and access them easily throughout the application.

export default registerAs(
    'jwt',
    (): JwtModuleOptions => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: process.env.JWT_EXPIRE_IN,
        },
    }),
);