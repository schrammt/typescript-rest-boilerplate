import * as Model from "../model";

export interface AdapterInterface {
    insert():void;
    update():void;
    select(): [Model.Identifiable];
}