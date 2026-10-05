export const TruncationThreshold = {
	short: 128,
	medium: 256,
	long: 512,
} as const;

export type TruncationThreshold = (typeof TruncationThreshold)[keyof typeof TruncationThreshold];

export function truncateErrorField(value: string, threshold: TruncationThreshold) {
	return value.length > threshold ? { value: `${value.slice(0, threshold)}…`, length: value.length } : value;
}
