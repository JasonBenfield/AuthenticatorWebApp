import { TypedFieldViewValue } from "./TypedFieldViewValue";
export declare class TextToNumberViewValue extends TypedFieldViewValue<string, number> {
    protected _fromView(value: string): number;
    protected _toView(value: number): string;
}
