import { DomainError } from "#shared/error/domain-error.ts";
import { truncateErrorField, TruncationThreshold } from "#shared/error/truncate.ts";

export class InvalidUserEmailError extends DomainError {
	public readonly code = "core.user.invalid_email";

	public constructor({ email }: { email: string }) {
		super({
			message: `Invalid user email format}`,
			metadata: { email: truncateErrorField(email, TruncationThreshold.short) },
		});
	}
}

export class InvalidUserPublicIdError extends DomainError {
	public readonly code = "core.user.invalid_user_public_id";

	public constructor({ id }: { id: string }) {
		super({
			message: `Invalid user public id`,
			metadata: { id: truncateErrorField(id, TruncationThreshold.short) },
		});
	}
}

export class InvalidPasswordError extends DomainError {
	public readonly code = "core.user.invalid_password";

	public constructor({ password }: { password: string }) {
		super({
			message: `Invalid user password format}`,
			metadata: { password: truncateErrorField(password, TruncationThreshold.short) },
		});
	}
}

export class InvalidPasswordHashError extends DomainError {
	public readonly code = "core.user.invalid_password_hash";

	public constructor() {
		super({ message: `Invalid user password hash format}` });
	}
}

export class EmailAlreadyUsedError extends DomainError {
	public readonly code = "core.user.email_already_used";

	public constructor({ email }: { email: string }) {
		super({
			message: `Email already used}`,
			metadata: { email: truncateErrorField(email, TruncationThreshold.short) },
		});
	}
}

export class PublicIdCollisionError extends DomainError {
	public readonly code = "core.user.public_id_collision";

	public constructor({ id }: { id: string }) {
		super({ message: `Public id collision`, metadata: truncateErrorField(id, TruncationThreshold.short) });
	}
}
