export type AuthJwtPayload = {
    sub: number;
};

// sub is a common name for the subject of the JWT, which is usually the user ID, this is a liek a type or template 
// for the payload that will be used to create the JWT token
// it is used to define the structure of the payload that will be encoded in the JWT token
