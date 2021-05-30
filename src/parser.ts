/**
 * @author WMXPY
 * @namespace JSON
 * @description Parser
 */

export class JSONParser {

    public static from(jsonString: string): JSONParser {

        return new JSONParser(jsonString);
    }

    private readonly _jsonString: string;

    private constructor(jsonString: string) {

        this._jsonString = jsonString;
    }
}
