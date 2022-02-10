import * as Model from "../../model";
import { AdapterInterface } from "../adapter";

export interface Interface<T extends Model.Identifiable> {
    create(t: T):T;
    read(id?: number): T|[T];
    update(t: T):boolean;
    delete(id: number):boolean;
}

export abstract class Base {
    protected dbAdapter: AdapterInterface;

    constructor(dbAdapter:AdapterInterface) {
        this.dbAdapter = dbAdapter;
    }
}
