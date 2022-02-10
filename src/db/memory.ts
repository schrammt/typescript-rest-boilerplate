import { AdapterInterface } from "./adapter";
import * as Model from "../model";

export class Memory implements AdapterInterface {

    protected data: Map<string, Model.Identifiable> = new Map();

    constructor(seed?: Map<string, Model.Identifiable>) {
        if (seed) {
            this.data = seed;
        }
    }

    insert(): void {
        throw new Error("Method not implemented.");
    }

    update(): void {
        throw new Error("Method not implemented.");
    }

    select(): [Model.Identifiable] {
        const data = Array.from(this.data.values()) as [Model.Identifiable]; 
        return data;
    }
    
}