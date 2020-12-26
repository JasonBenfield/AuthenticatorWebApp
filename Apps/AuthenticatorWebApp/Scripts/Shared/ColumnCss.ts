import { CssClass } from "./CssClass";

export interface ColumnCssOptions {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    autosize?: boolean;
}

export class ColumnCss {
    constructor(options: ColumnCssOptions | number) {
        if (typeof options === 'number') {
            if (options >= 0) {
                this.cssClass.addName(this.getCssClass('xs', options));
            }
        }
        else {
            if (!options) {
                options = {};
            }
            if (options.xs >= 0) {
                this.cssClass.addName(this.getCssClass('xs', options.xs));
            }
            if (options.sm >= 0) {
                this.cssClass.addName(this.getCssClass('sm', options.xs));
            }
            if (options.md >= 0) {
                this.cssClass.addName(this.getCssClass('md', options.xs));
            }
            if (options.lg >= 0) {
                this.cssClass.addName(this.getCssClass('lg', options.xs));
            }
            if (options.xl >= 0) {
                this.cssClass.addName(this.getCssClass('xl', options.xs));
            }
            if (!options.xs && !options.sm && !options.md && !options.lg && !options.xl) {
                if (options && options.autosize) {
                    this.cssClass.addName('col-auto');
                }
                else {
                    this.cssClass.addName('col');
                }
            }
        }
    }

    private getCssClass(size: string, columns: number) {
        let css = 'col';
        if (size && size !== 'xs') {
            css += `-${size}`;
        }
        if (columns > 0) {
            css += `-${columns}`;
        }
        return css;
    }

    private readonly cssClass = new CssClass();

    toString() {
        return this.cssClass.toString();
    }
}