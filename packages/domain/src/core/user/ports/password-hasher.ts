import { type PasswordHash } from "../domain/user-password-hash.ts";
import { type PlainPassword } from "../domain/user-plain-password.ts";

export type PasswordHasher = {
	hash(plain: PlainPassword): Promise<PasswordHash>;
	verify(hash: PasswordHash, plain: PlainPassword): Promise<boolean>;
	needsRehash(hash: PasswordHash): boolean;
};
