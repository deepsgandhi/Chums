import { Repositories } from "../repositories";
import { CustomBaseController } from "../apiBase/controllers"

export class ChumsBaseController extends CustomBaseController {

    public repositories: Repositories;

    constructor() {
        super();
        this.repositories = Repositories.getCurrent();
    }



}
