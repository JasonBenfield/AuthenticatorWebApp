import { FieldViewValue } from "./FieldViewValue";
export declare class TypedFieldViewValue<TView, TActual> extends FieldViewValue {
    getValue(): TActual;
    setValue(value: TActual): void;
    setValueFromView(value: TView): void;
}
