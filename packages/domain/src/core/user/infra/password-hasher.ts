import * as argon2 from "argon2";
import { PasswordHash } from "../domain/user-password-hash.ts";
import { type PlainPassword } from "../domain/user-plain-password.ts";
import { type PasswordHasher } from "../ports/password-hasher.ts";

const config = {
	memoryCost: 19_456,
	timeCost: 2,
	parallelism: 1,
} as const;

export class Argon2PasswordHasher implements PasswordHasher {
	public async hash(plain: PlainPassword): Promise<PasswordHash> {
		const encoded = await argon2.hash(plain.reveal(), config);
		return PasswordHash.create(encoded);
	}

	public async verify(hash: PasswordHash, plain: PlainPassword): Promise<boolean> {
		try {
			return await argon2.verify(hash.value, plain.reveal());
		} catch {
			return false;
		}
	}

	public needsRehash(hash: PasswordHash): boolean {
		return argon2.needsRehash(hash.value, config);
	}
}
