export class A {
    private _name: string;

    get name() {
        return this._name;
    }

    constructor (name) {
        this._name = name;
    }

    sayHi () {
        alert("hello, " + this._name);
    }
}

