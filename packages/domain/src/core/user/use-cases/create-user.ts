import { EmailAlreadyUsedError } from "../domain/errors.ts";
import { UserEmail } from "../domain/user-email.ts";
import { UserId } from "../domain/user-id.ts";
import { PlainPassword } from "../domain/user-plain-password.ts";
import { User } from "../domain/user.ts";
import { type PasswordHasher } from "../ports/password-hasher.ts";

export type CreateUserInput = {
	email: string;
	password: string;
};

export type CreateUserDeps = {
	users: {
		existsByEmail(email: string): Promise<boolean>;
		save(user: User): Promise<void>;
	};
	hasher: PasswordHasher;
};

export class CreateUser {
	public constructor(private readonly deps: CreateUserDeps) {}

	public async execute(input: CreateUserInput): Promise<User> {
		const email = UserEmail.create(input.email);
		const password = PlainPassword.create(input.password);

		if (await this.deps.users.existsByEmail(email.value)) {
			throw new EmailAlreadyUsedError({ email: email.value });
		}

		const passwordHash = await this.deps.hasher.hash(password);

		const id = UserId.generate();

		const user = User.create({
			id,
			email,
			passwordHash,
		});

		await this.deps.users.save(user);

		return user;
	}
}
