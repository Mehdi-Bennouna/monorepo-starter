import { InvalidPasswordError } from "./errors.ts";

const MIN_LENGTH = 10;
const MAX_LENGTH = 128;

export class PlainPassword {
	private constructor(private readonly secret: string) {}

	public static create(raw: string): PlainPassword {
		if (raw.length > MAX_LENGTH) throw new InvalidPasswordError({ password: raw });
		if (raw.length < MIN_LENGTH) throw new InvalidPasswordError({ password: raw });
		return new PlainPassword(raw);
	}

	public reveal(): string {
		return this.secret;
	}

	public toString() {
		return "[redacted]";
	}

	public toJSON() {
		return "[redacted]";
	}

	public [Symbol.for("nodejs.util.inspect.custom")]() {
		return "PlainPassword([redacted])";
	}
}
