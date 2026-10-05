import { v7 as uuidv7 } from "uuid";

export class UserId {
	private constructor(public readonly value: string) {}

	public static generate() {
		return new UserId(uuidv7());
	}

	public static fromTrusted(stored: string) {
		return new UserId(stored);
	}

	public equals(o: UserId) {
		return this.value === o.value;
	}
}
