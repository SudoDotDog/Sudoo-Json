/**
 * @author WMXPY
 * @namespace Json
 * @description Nested
 */

import { readTextFile } from "@sudoo/io";
import { JSONElement } from "./declare";

export const readNestedJson = async <T extends JSONElement = any>(path: string): Promise<T> => {

    const text: string = await readTextFile(path);

    return text as T;
};
