import {NestFactory} from '@nestjs/core';
import {SeedModule} from './seed.module';
import {AllSeed} from "./all.seed";

const runSeed = async () => {
    const app = await NestFactory.create(SeedModule);
    await app.listen(3333);
    await app.get(AllSeed).runSeeds();
    await app.close();
};

void runSeed();
