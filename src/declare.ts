/**
 * @author WMXPY
 * @namespace Json
 * @description Declare
 */

export type JSONKeyBasic = string | number;
export type JSONValueBasic = JSONKeyBasic | boolean;
export type JSONElement = JSONValueBasic | Record<JSONKeyBasic, any> | any[];
