import { ColumnCss } from "../ColumnCss";
export declare class FieldCaption {
    private readonly vm;
    constructor(vm: IFieldCaptionViewModel);
    private caption;
    setCaption(caption: string): void;
    getCaption(): string;
    setColumns(columns: ColumnCss): void;
}
