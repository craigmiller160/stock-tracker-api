export interface Jwk {
    kty: string;
    e: string;
    use: string;
    kid: string;
    alg: string;
    n: string;
}

export interface JwkSet {
    keys: Jwk[];
}
