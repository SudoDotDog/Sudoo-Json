/**
 * @author WMXPY
 * @namespace Json
 * @description Parser
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { JSONParser } from '../../src';

describe('Given {JSONParser} Class', (): void => {

    const chance: Chance.Chance = new Chance('json-parser');

    it('should be able to construct', async (): Promise<void> => {

        const parser: JSONParser = JSONParser.from(chance.string());

        expect(parser).to.be.instanceOf(JSONParser);
    });
});
