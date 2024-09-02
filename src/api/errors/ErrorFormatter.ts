export interface ErrorFormatter {
    formatError(error: Error): string
}