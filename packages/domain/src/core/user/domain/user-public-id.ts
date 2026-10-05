import { type } from "arktype";
import { customAlphabet } from "nanoid";
import { InvalidUserPublicIdError } from "./errors.ts";

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const LENGTH = 12;
const generate = customAlphabet(ALPHABET, LENGTH);
const shape = type("/^[0-9a-hjkmnp-tv-z]{12}$/");

export class UserPublicId {
	private constructor(public readonly value: string) {}

	public static generate() {
		return new UserPublicId(generate());
	}

	public static from(raw: string) {
		if (shape(raw) instanceof type.errors) {
			throw new InvalidUserPublicIdError({ id: raw });
		}
		return new UserPublicId(raw);
	}

	public static fromTrusted(stored: string) {
		return new UserPublicId(stored);
	}

	public equals(o: UserPublicId) {
		return this.value === o.value;
	}
}
