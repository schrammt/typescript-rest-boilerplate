import * as Model from "../../model";
import * as Dao from "./dao";

export class User extends Dao.Base implements Dao.Interface<Model.User.Interface> {
    create(t: Model.User.Interface): Model.User.Interface {
        throw new Error("Method not implemented.");
    }

    read(id?: number): Model.User.Interface|[Model.User.Interface] {
        if (id) {

        }

        return this.dbAdapter.select() as [Model.User.Interface];
    }

    update(t: Model.User.Interface): boolean {
        throw new Error("Method not implemented.");
    }

    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }

}