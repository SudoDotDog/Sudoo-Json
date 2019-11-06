/**
 * @author WMXPY
 * @namespace Json
 * @description Nested
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { readNestedJson } from '../../src';
import { mockReadJson } from '../mock/text';

describe('Given [Nested] Functions', (): void => {

    const chance: Chance.Chance = new Chance('json-nested');

    it('should be able to ', async (): Promise<void> => {

        const text: string = chance.string();

        const restore = mockReadJson(text);
        const result: any = await readNestedJson(chance.string());

        expect(result).to.be.equal(text);

        restore();
    });
});
