import { type DomainErrorCode } from "#shared/error/error-codes.ts";

export interface SerializedDomainError {
	message: string;
	stack: string | undefined;
	cause: string | undefined;
	code: string;
	metadata?: unknown;
}

export abstract class DomainError extends Error {
	public abstract code: DomainErrorCode;
	public readonly metadata: unknown;

	protected constructor({ message, cause, metadata }: { message: string; cause?: Error | undefined; metadata?: unknown }) {
		super(message, { cause });
		this.metadata = metadata;
	}

	public toJSON(): SerializedDomainError {
		return {
			message: this.message,
			code: this.code,
			stack: this.stack,
			cause: JSON.stringify(this.cause),
			metadata: this.metadata,
		};
	}
}
