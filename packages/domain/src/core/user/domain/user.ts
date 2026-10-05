import { UserEmail } from "./user-email.ts";
import { UserId } from "./user-id.ts";
import { PasswordHash } from "./user-password-hash.ts";

type UserAttributes = {
	id: string;
	email: string;
	passwordHash: string;
};

type UserMemento = {
	id: string;
	email: string;
	passwordHash: string;
};

type CreateUserInput = {
	id: UserId;
	email: UserEmail;
	passwordHash: PasswordHash;
};

export class User {
	public constructor(private readonly attributes: UserAttributes) {
		this.attributes = attributes;
	}

	public static create(input: CreateUserInput): User {
		return new User({
			id: input.id.value,
			email: input.email.value,
			passwordHash: input.passwordHash.value,
		});
	}

	public static fromMemento(m: UserMemento): User {
		return new User(m);
	}

	public toMemento(): UserMemento {
		return {
			id: this.attributes.id,
			email: this.attributes.email,
			passwordHash: this.attributes.passwordHash,
		};
	}
}
