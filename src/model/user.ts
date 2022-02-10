import { randomUUID } from "crypto";
import { Identifiable } from "./model";
import { faker } from "@faker-js/faker";

export namespace User {

    export interface Interface extends Identifiable {
        firstname: string;
        lastname: string;
        email: string;
    }


    export function createSeed(amount: Number = 1): Map<string, User.Interface> {
        let seed = new Map();

        for (let i = 0; i < amount; i++) {
            const uuid = randomUUID(); 
            const user: User.Interface = {
                id: uuid,
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email()
            };
            seed.set(uuid, user);
        }

        return seed;
    }

}
