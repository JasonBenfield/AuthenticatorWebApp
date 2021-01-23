export declare class FormattedDate {
    private readonly value;
    private readonly dateOptions;
    private readonly timeOptions;
    constructor(value: Date, options?: Intl.DateTimeFormatOptions);
    formatDate(): string;
    formatTime(): string;
    formatDateTime(): string;
    toString(): string;
}
