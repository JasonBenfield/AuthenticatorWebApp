import * as ko from 'knockout';
import { DefaultEvent, DefaultEventHandler } from './Events';
import * as template from './Templates/TextInput.html';
import { ComponentTemplate } from './ComponentTemplate';
import { CssClass } from './CssClass';
import { ColumnCss } from './ColumnCss';

export class TextInputViewModel {
    constructor(caption?: string) {
        new ComponentTemplate(this.componentName(), template).register();
        if (caption) {
            this.caption(caption);
        }
    }

    readonly componentName = ko.observable('text-input');
    readonly type = ko.observable('');
    readonly caption = ko.observable('');
    readonly captionCss = ko.observable('');
    readonly isCaptionVisible = ko.observable(true);
    readonly value = ko.observable('');
    readonly valueCss = ko.observable('');
    readonly isValueVisible = ko.observable(true);
    readonly isVisible = ko.observable(true);
    readonly isEnabled = ko.observable(true);
    readonly name = ko.observable<string>(null);

    private readonly _valueChanged = new DefaultEvent<string>(this);
    readonly valueChanged = new DefaultEventHandler(this._valueChanged);

    change(value: string) {
        this._valueChanged.invoke(value);
    }
}

export class TextInput {
    constructor(private readonly vm: TextInputViewModel) {
        this.vm.type('text');
        this.setCaptionColumns(null);
    }

    readonly valueChanged = this.vm.valueChanged;

    setColumns(captionColumns: ColumnCss, valueColumns: ColumnCss) {
        this.setCaptionColumns(captionColumns);
        this.setValueColumns(valueColumns);
    }

    setCaptionColumns(columns: ColumnCss) {
        let captionCss = new CssClass('col-form-label');
        if (columns) {
            captionCss.addName(columns.toString());
        }
        this.vm.captionCss(captionCss.toString());
    }

    setValueColumns(columns: ColumnCss) {
        let valueCss = new CssClass('');
        if (columns) {
            valueCss.addName(columns.toString());
        }
        this.vm.valueCss(valueCss.toString());
    }

    named(name: string) {
        this.vm.name(name);
    }

    setCaption(caption: string) {
        this.vm.caption(caption);
    }

    setValue(text: string) {
        this.vm.value(text);
    }

    getValue() { return this.vm.value(); }

    show() {
        this.vm.isVisible(true);
    }

    hide() {
        this.vm.isVisible(false);
    }

    showCaption() {
        this.vm.isCaptionVisible(true);
    }

    hideCaption() {
        this.vm.isCaptionVisible(false);
    }

    showValue() {
        this.vm.isValueVisible(true);
    }

    hideValue() {
        this.vm.isValueVisible(false);
    }

    enable() {
        this.vm.isEnabled(true);
    }

    disable() {
        this.vm.isEnabled(false);
    }
}

export class PasswordInput extends TextInput {
    constructor(vm: TextInputViewModel) {
        super(vm);
        vm.type('password');
    }
}