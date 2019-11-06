/**
 * @author WMXPY
 * @namespace Json
 * @description Text
 * @override Mock
 */

import * as __Sudoo_IO from "@sudoo/io";
import { Mock } from "@sudoo/mock";

export type RestoreMockFunction = () => void;

export const mockReadJson = (defaultResult: any, paths: Record<string, any> = {}): RestoreMockFunction => {

    const textPaths: Record<string, string> = Object.keys(paths).reduce((previous: Record<string, string>, current: string) => {
        return {
            ...previous,
            [current]: JSON.stringify(paths[current]),
        };
    }, {} as Record<string, string>);

    return mockReadText(JSON.stringify(defaultResult), textPaths);
};

export const mockReadText = (defaultResult: string, paths: Record<string, string> = {}): RestoreMockFunction => {

    const mock = Mock.create(__Sudoo_IO, 'readTextFile');
    mock.mock(async (path: string): Promise<string> => {

        if (paths[path]) {
            return paths[path] as string;
        }
        return defaultResult;
    });

    return mock.restore;
};
