import { TypedFieldViewValue } from "./TypedFieldViewValue";
export declare class TextToDateViewValue extends TypedFieldViewValue<string, Date> {
    protected _fromView(value: string): Date;
    protected _toView(value: Date): string;
}
