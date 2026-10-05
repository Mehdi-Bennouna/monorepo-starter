import { InvalidPasswordHashError } from "./errors.ts";

export class PasswordHash {
	private constructor(public readonly value: string) {}

	public static create(encoded: string): PasswordHash {
		if (!/^\$[a-z0-9]+\$/.test(encoded)) throw new InvalidPasswordHashError();
		return new PasswordHash(encoded);
	}

	public static fromTrusted(stored: string): PasswordHash {
		return new PasswordHash(stored);
	}

	public toString() {
		return "[redacted]";
	}
	public toJSON() {
		return "[redacted]";
	}
}
