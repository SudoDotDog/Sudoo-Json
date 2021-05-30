/**
 * @author WMXPY
 * @namespace JSON
 * @description Stringifier
 */

import { Pattern } from "@sudoo/pattern";
import { Verifier, VerifyResult } from "@sudoo/verify";

export class JSONStringifier<T extends any = any> {

    public static from<T extends any = any>(jsonObject: T): JSONStringifier<T> {

        return new JSONStringifier<T>(jsonObject);
    }

    private readonly _jsonObject: T;

    private constructor(jsonObject: T) {

        this._jsonObject = jsonObject;
    }

    public stringify(space?: string | number): string {

        return JSON.stringify(this._jsonObject, null, space);
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
}
