export class JsonText {
    constructor(data: any) {
        this.value = JSON.stringify(data);
    }

    private readonly value: string;

    toString() {
        return this.value;
    }
}