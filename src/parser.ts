/**
 * @author WMXPY
 * @namespace JSON
 * @description Parser
 */

import { Pattern } from "@sudoo/pattern";
import { Verifier, VerifyResult } from "@sudoo/verify";

export class JSONParser<T extends any = any> {

    public static from<T extends any = any>(jsonString: string): JSONParser<T> {

        return new JSONParser<T>(jsonString);
    }

    private readonly _jsonString: string;
    private _parseResult?: T;
    private _parseError?: string;

    private constructor(jsonString: string) {

        this._jsonString = jsonString;
    }

    public get parseError(): string | undefined {
        return this._parseError;
    }

    public parseOrThrow(): T {

        const parseResult: boolean = this.attemptParse();

        if (parseResult) {
            return this._parseResult as T;
        }

        throw new Error(this._parseError);
    }

    public parseOrDefault<D extends any = T>(defaultValue: D): T | D {

        const parseResult: boolean = this.attemptParse();

        if (parseResult) {
            return this._parseResult as T;
        }

        return defaultValue;
    }

    public attemptParse(): boolean {

        if (typeof this._parseResult !== 'undefined') {
            return true;
        }

        try {

            const result: T = JSON.parse(this._jsonString);
            this._parseResult = result;

            return true;
        } catch (error) {

            this._parseError = error.message;

            return false;
        }
    }

    public verify(pattern: Pattern): boolean {

        const parseResult: boolean = this.attemptParse();

        if (!parseResult) {
            return false;
        }

        const verifier: Verifier = Verifier.create(pattern);
        const verifyResult: VerifyResult = verifier.verify(this._parseResult);

        return verifyResult.succeed;
    }
}
