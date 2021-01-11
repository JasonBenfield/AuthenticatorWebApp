export interface ColumnCssOptions {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    autosize?: boolean;
}
export declare class ColumnCss {
    constructor(options?: ColumnCssOptions | number);
    private getCssClass;
    private readonly cssClass;
    toString(): string;
}
