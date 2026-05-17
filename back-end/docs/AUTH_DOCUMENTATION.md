# Auth Module Documentation

## Overview

This documentation describes the `back-end/src/auth` module implementation for the Zoom Tickets project. The auth module implements Active Directory authentication with JWT-based session management in a NestJS application.

The auth architecture is:

- `AuthController` handles login requests.
- `AuthService` performs Active Directory authentication and group membership checks.
- `JwtStrategy` validates incoming JWT tokens for protected routes.
- `AuthGuard` extracts and verifies JWT tokens from incoming HTTP requests.
- `UserService` is used to map AD users into the application database.

## Directory Structure

`back-end/src/auth`

- `auth/auth.controller.ts` - login endpoint and token issuance.
- `auth/auth.service.ts` - AD authentication, user retrieval, group membership checks.
- `auth/auth.module.ts` - NestJS auth module wiring, JWT module configuration, and DI.
- `auth/guards/auth/auth.guard.ts` - JWT guard for route protection.
- `strategies/jwt.strategy.ts` - Passport JWT validation strategy.

## Core Packages Used

### NestJS packages

- `@nestjs/common` - standard NestJS decorators and exceptions.
- `@nestjs/jwt` - JWT signing and verification.
- `@nestjs/passport` - passport integration for NestJS.
- `@nestjs/config` - configuration and environment variable management.
- `passport-jwt` - JWT authentication strategy support.

### Active Directory and LDAP

- `activedirectory` - the main Active Directory client used to authenticate with AD and query user/group data.
- `activedirectory2` - included in dependencies but not explicitly used by the current auth module.

### Other relevant packages

- `dotenv` - loads environment variables from `.env` files.

## Auth Flow

### 1. Login Request

The client calls:

- `POST /auth/login`

Request body:

```json
{
  "userName": "user@domain",
  "passWord": "password"
}
```

### 2. AD Authentication

`AuthController.login()` calls `AuthService.authenticate(userName, passWord)`.

`AuthService.authenticate()` uses the `activedirectory` client:

- `ad.authenticate(userName, passWord, callback)`
- If authentication succeeds, it calls `ad.findUser(userName, callback)` to read the AD user record.

The resolved AD user object is returned to the controller.

### 3. Local Database User Mapping

After AD authentication, the controller checks if the user exists locally using `UserService.findByUsername(user.sAMAccountName)`.

- If the user does not exist, it creates the user in the local database.
- If the user exists, it updates the role based on AD group membership.

The created or updated local user includes:

- `username` = `user.sAMAccountName`
- `name` = `user.displayName`
- `email` = `user.mail`
- `role` = `'admin'` or `'user'`

### 4. Group Membership Check

The controller calls `AuthService.isUserInGroup(body.userName, 'Administrators')` to check if the user is in the `Administrators` AD group.

The role is assigned as:

- `admin` if member of `Administrators`
- `user` otherwise

### 5. JWT Token Issuance

A JWT token is signed with the local user ID:

```ts
const token = this.jwtService.sign({ userId: existingUser.user_id });
```

The response is:

```json
{
  "token": "<jwt>",
  "user": { ...existingUser }
}
```

## JWT Validation

### `JwtStrategy`

This strategy is registered with Passport and configured to:

- extract token from `Authorization: Bearer <token>`
- validate token expiration
- use `SECRET_KEY` as the signing secret

If the token is valid, it loads the user by ID from the local database using `UserService.findById(payload.userId)`.

### `AuthGuard`

The guard extracts the bearer token from the request header and verifies it using `JwtService.verifyAsync()` with `process.env.SECRET_KEY`.

If verification fails, it throws `UnauthorizedException()`.

## Environment Variables and Secrets

The implementation currently uses `dotenv` in several files and expects environment values in a `.env` file. The module is not fully consistent: some AD settings are hard-coded while JWT secret is loaded from env.

### Required environment variables

- `SECRET_KEY` - JWT signing key used by `JwtModule` and `AuthGuard`.
- `AD_URL` - Active Directory LDAP URL.
- `BASE_DN` - AD base Distinguished Name.
- `USER_NAME` - AD account name for queries.
- `PASSWORD` - AD account password for queries.

### Recommended `.env` structure

```env
SECRET_KEY=replace_with_a_strong_secret
AD_URL=ldap://ad-server.example.com:389
BASE_DN=dc=example,dc=com
USER_NAME=ad-lookup-account@example.com
PASSWORD=super-secret-ad-password
```

### Current hard-coded AD config in code

In `auth.service.ts`, the current implementation uses a hard-coded `adConfig` object:

```ts
const adConfig = {
    url: 'ldap://172.20.6.12:389',
    baseDN: 'dc=egypt,dc=aast,dc=edu',
    username: 'ahmed.mabrouk@egypt.aast.edu',
    password: 'Am@10257',
    followReferrals: true,
    maxReferralHops: 10,
};
```

This should be replaced with a configuration object loaded from environment variables for production readiness.

## Module Wiring

### `auth.module.ts`

The module imports:

- `UserModule` - to read/create users in the local DB.
- `PassportModule` - Passport integration.
- `JwtModule.registerAsync(...)` - JWT config is loaded from `ConfigService`.
- `ConfigModule` - makes `ConfigService` available.

Providers:

- `AuthService`
- `JwtStrategy`

Controller:

- `AuthController`

Exports:

- `AuthService`

## Implementation Notes

### AD integration details

- `activedirectory` uses LDAP to authenticate credentials and query AD.
- Authentication is performed with `ad.authenticate()`.
- User information is retrieved with `ad.findUser()`.
- Group membership is checked with `ad.isUserMemberOf()`.
- The code is currently tied to `Administrators` group membership for admin role assignment.

### Local user persistence

- The local user store is populated only during login if the AD user does not exist locally.
- If the user exists locally, the role is recalculated every login.
- The local user entity is required for JWT session handling and user lookups.

### Security and improvements

- Move AD connection settings out of hard-coded constants and into environment variables.
- Ensure `SECRET_KEY` is strongly generated and protected.
- Prefer `JWT` token expiration and refresh token handling if needed.
- Use HTTPS in production and protect the login endpoint against brute-force.
- If using `Passport` globally, apply `AuthGuard` at controller/route level or by strategy.

## Re-implementation Guidance

To implement this auth flow in another application, follow these steps:

1. Create a NestJS auth module with `AuthController`, `AuthService`, and `AuthGuard`.
2. Install and configure `@nestjs/jwt`, `@nestjs/passport`, and `passport-jwt`.
3. Install `activedirectory` for Active Directory authentication.
4. Add `@nestjs/config` and load `.env` values.
5. Implement AD authentication with `ad.authenticate()` and `ad.findUser()`.
6. Implement AD group membership checks with `ad.isUserMemberOf()`.
7. Persist AD users in a local database if the user is first-time login.
8. Issue a signed JWT token with the local user ID and verify it on protected routes.
9. Use a guard to verify the JWT token and attach the request user payload.

## Key Files Summary

- `back-end/src/auth/auth/auth.controller.ts`
- `back-end/src/auth/auth/auth.service.ts`
- `back-end/src/auth/auth/auth.module.ts`
- `back-end/src/auth/guards/auth/auth.guard.ts`
- `back-end/src/auth/strategies/jwt.strategy.ts`

## Important Warnings

- Do not keep AD credentials in source control.
- Replace hard-coded AD credentials and LDAP settings with environment variables.
- Confirm the AD group name (`Administrators`) matches the target AD setup.
- Confirm the AD username format expected by your AD instance (UPN, SAMAccountName, or DN).

---

This file is intended to be the reference for re-implementing the same Active Directory login architecture in another project.
