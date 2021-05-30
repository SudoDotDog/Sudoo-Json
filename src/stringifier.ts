/**
 * @author WMXPY
 * @namespace JSON
 * @description Stringifier
 */

import { Pattern } from "@sudoo/pattern";
import { Verifier, VerifyResult } from "@sudoo/verify";
import { JSONReplacer } from "./declare";

export class JSONStringifier<T extends any = any> {

    public static from<T extends any = any>(jsonObject: T): JSONStringifier<T> {

        return new JSONStringifier<T>(jsonObject);
    }

    private readonly _replacers: JSONReplacer[];
    private readonly _jsonObject: T;

    private constructor(jsonObject: T) {

        this._replacers = [];
        this._jsonObject = jsonObject;
    }

    public stringify(space?: string | number): string {

        if (this._replacers.length > 0) {

            return JSON.stringify(this._jsonObject, (key: string, value: any) => {

                return this._runReplace(key, value);
            }, space);
        }
        return JSON.stringify(this._jsonObject, null, space);
    }

    public addReplacer(replacer: JSONReplacer): this {

        this._replacers.push(replacer);
        return this;
    }

    public verify(pattern: Pattern): boolean {

        const verifyResult: VerifyResult = this.rawVerify(pattern);

        return verifyResult.succeed;
    }

    public rawVerify(pattern: Pattern): VerifyResult {

        const verifier: Verifier = Verifier.create(pattern);
        const verifyResult: VerifyResult = verifier.verify(this._jsonObject);

        return verifyResult;
    }

    private _runReplace(key: string, value: any): any {

        let currentValue = value;
        for (const replacer of this._replacers) {

            if (typeof currentValue === 'undefined') {
                return currentValue;
            }

            currentValue = replacer(key, value);
        }

        return currentValue;
    }
}
