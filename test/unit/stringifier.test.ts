/**
 * @author WMXPY
 * @namespace Json
 * @description Stringifier
 * @override Unit
 */

import { createMapPattern, createStringPattern, Pattern } from '@sudoo/pattern';
import { expect } from 'chai';
import * as Chance from 'chance';
import { JSONStringifier } from '../../src';

describe('Given {JSONStringifier} Class', (): void => {

    const chance: Chance.Chance = new Chance('json-stringifier');

    it('should be able to construct', async (): Promise<void> => {

        const stringifier: JSONStringifier = JSONStringifier.from(chance.string());

        expect(stringifier).to.be.instanceOf(JSONStringifier);
    });

    it('should be able to verify - happy path', async (): Promise<void> => {

        const pattern: Pattern = createMapPattern({
            hello: createStringPattern(),
        });

        const stringifier: JSONStringifier = JSONStringifier.from({
            hello: chance.string(),
        });

        const verifyResult: boolean = stringifier.verify(pattern);

        expect(verifyResult).to.be.true;
    });

    it('should be able to verify - sad path', async (): Promise<void> => {

        const pattern: Pattern = createMapPattern({
            hello: createStringPattern(),
        });

        const stringifier: JSONStringifier = JSONStringifier.from({
            world: chance.string(),
        });

        const verifyResult: boolean = stringifier.verify(pattern);

        expect(verifyResult).to.be.false;
    });
});
