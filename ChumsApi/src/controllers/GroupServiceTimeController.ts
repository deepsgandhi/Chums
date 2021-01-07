import { controller, httpPost, httpGet, interfaces, requestParam, httpDelete } from "inversify-express-utils";
import express from "express";
import { ChumsBaseController } from "./ChumsBaseController"
import { GroupServiceTime } from "../models"

@controller("/groupservicetimes")
export class GroupServiceTimeController extends ChumsBaseController {

    @httpGet("/:id")
    public async get(@requestParam("id") id: number, req: express.Request<{}, {}, null>, res: express.Response): Promise<interfaces.IHttpActionResult> {
        return this.actionWrapper(req, res, async (au) => {
            return this.repositories.groupServiceTime.convertAllToModel(au.churchId, await this.repositories.groupServiceTime.load(au.churchId, id));
        });
    }

    @httpGet("/")
    public async getAll(req: express.Request<{}, {}, null>, res: express.Response): Promise<interfaces.IHttpActionResult> {
        return this.actionWrapper(req, res, async (au) => {
            let result = null;
            if (req.query.groupId !== undefined) result = await this.repositories.groupServiceTime.loadWithServiceNames(au.churchId, parseInt(req.query.groupId.toString(), 0));
            else result = await this.repositories.groupServiceTime.loadAll(au.churchId);
            return this.repositories.groupServiceTime.convertAllToModel(au.churchId, result);
        });
    }

    @httpPost("/")
    public async save(req: express.Request<{}, {}, GroupServiceTime[]>, res: express.Response): Promise<interfaces.IHttpActionResult> {
        return this.actionWrapper(req, res, async (au) => {
            if (!au.checkAccess("Services", "Edit")) return this.json({}, 401);
            else {
                const promises: Promise<GroupServiceTime>[] = [];
                req.body.forEach(groupservicetime => { groupservicetime.churchId = au.churchId; promises.push(this.repositories.groupServiceTime.save(groupservicetime)); });
                const result = await Promise.all(promises);
                return this.repositories.groupServiceTime.convertAllToModel(au.churchId, result);
            }
        });
    }

    @httpDelete("/:id")
    public async delete(@requestParam("id") id: number, req: express.Request<{}, {}, null>, res: express.Response): Promise<interfaces.IHttpActionResult> {
        return this.actionWrapper(req, res, async (au) => {
            if (!au.checkAccess("Services", "Edit")) return this.json({}, 401);
            else await this.repositories.groupServiceTime.delete(au.churchId, id);
        });
    }

}
