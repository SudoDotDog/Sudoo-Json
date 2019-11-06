/**
 * @author WMXPY
 * @namespace Json
 * @description Text
 * @override Mock
 */

import * as __Sudoo_IO from "@sudoo/io";
import { Mock } from "@sudoo/mock";

export const mockReadText = (defaultResult: string, paths: Record<string, string> = {}): () => void => {

    const mock = Mock.create(__Sudoo_IO, 'readTextFile');
    mock.mock(async (path: string): Promise<string> => {

        if (paths[path]) {
            return paths[path] as string;
        }
        return defaultResult;
    });

    return mock.restore;
};
