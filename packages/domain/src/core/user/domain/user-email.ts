import { type } from "arktype";
import { InvalidUserEmailError } from "./errors.ts";

export const MAX_LENGTH = 254;

export class UserEmail {
	private constructor(public readonly value: string) {}

	public static create(raw: string): UserEmail {
		const normalized = raw.trim().toLowerCase();
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		const TEmail = type(`string < ${MAX_LENGTH}`).and("string.email");

		if (TEmail(normalized) instanceof type.errors) {
			throw new InvalidUserEmailError({ email: normalized });
		}

		return new UserEmail(normalized);
	}

	public static fromTrusted(stored: string): UserEmail {
		return new UserEmail(stored);
	}

	public equals(other: UserEmail): boolean {
		return this.value === other.value;
	}

	public toString(): string {
		return this.value;
	}
}
