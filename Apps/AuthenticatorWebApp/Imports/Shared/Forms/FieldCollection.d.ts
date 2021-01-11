export declare class FieldCollection {
    private readonly fields;
    values(): IField[];
    getField(name: string): IField;
    addField<TField extends IField>(field: TField): TField;
    clearErrors(): void;
    validate(errors: IErrorList): void;
    import(values: Record<string, any>): void;
    export(values: Record<string, any>): void;
}
