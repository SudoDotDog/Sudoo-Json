/**
 * @author WMXPY
 * @namespace Json
 * @description Parser
 * @override Unit
 */

import { createMapPattern, createStringPattern, Pattern } from '@sudoo/pattern';
import { expect } from 'chai';
import * as Chance from 'chance';
import { JSONParser } from '../../src';

describe('Given {JSONParser} Class', (): void => {

    const chance: Chance.Chance = new Chance('json-parser');

    it('should be able to construct', async (): Promise<void> => {

        const parser: JSONParser = JSONParser.from(chance.string());

        expect(parser).to.be.instanceOf(JSONParser);
    });

    it('should be able to verify - happy path', async (): Promise<void> => {

        const pattern: Pattern = createMapPattern({
            hello: createStringPattern(),
        });

        const parser: JSONParser = JSONParser.from(JSON.stringify({
            hello: chance.string(),
        }));

        const verifyResult: boolean = parser.verify(pattern);

        expect(verifyResult).to.be.true;
    });

    it('should be able to verify - sad path', async (): Promise<void> => {

        const pattern: Pattern = createMapPattern({
            hello: createStringPattern(),
        });

        const parser: JSONParser = JSONParser.from(JSON.stringify({
            world: chance.string(),
        }));

        const verifyResult: boolean = parser.verify(pattern);

        expect(verifyResult).to.be.false;
    });

    it('should be able to parse or throw - happy path', async (): Promise<void> => {

        const world: string = chance.string();
        const parser: JSONParser = JSONParser.from(JSON.stringify({
            hello: world,
        }));

        const parseResult: any = parser.parseOrThrow();

        expect(parseResult).to.be.deep.equal({
            hello: world,
        });
    });

    it('should be able to parse or throw - sad path', async (): Promise<void> => {

        const random: string = chance.string();
        const parser: JSONParser = JSONParser.from(random);

        const exec = () => {
            parser.parseOrThrow();
        };

        expect(exec).to.be.throw(`Unexpected token ${random[0]} in JSON at position 0`);
    });

    it('should be able to parse or default - happy path', async (): Promise<void> => {

        const world: string = chance.string();
        const defaultValue: string = chance.string();
        const parser: JSONParser = JSONParser.from(JSON.stringify({
            hello: world,
        }));

        const parseResult: any = parser.parseOrDefault(defaultValue);

        expect(parseResult).to.be.deep.equal({
            hello: world,
        });
    });

    it('should be able to parse or default - sad path', async (): Promise<void> => {

        const random: string = chance.string();
        const defaultValue: string = chance.string();
        const parser: JSONParser = JSONParser.from(random);

        const parseResult: any = parser.parseOrDefault(defaultValue);

        expect(parseResult).to.be.equal(defaultValue);
    });
});
