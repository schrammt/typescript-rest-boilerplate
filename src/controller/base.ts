import * as Dao from "../db/dao";
import * as Model from "../model";

export abstract class Base {
    protected dao: Dao.Interface<Model.Identifiable>;
    
    constructor(dao: Dao.Interface<Model.Identifiable>) {
        this.dao = dao;
    }
}