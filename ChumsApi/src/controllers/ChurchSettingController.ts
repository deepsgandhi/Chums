import { controller, httpPost, httpGet, interfaces } from 'inversify-express-utils'
import express from 'express'
import { ChumsBaseController } from './ChumsBaseController'
import { RoleContentType, RoleAction } from '../constants'
import { ChurchSetting } from '../models'

@controller("/churchsettings")
export class ChurchSettingController extends ChumsBaseController {

    @httpGet("/")
    public async get(req: express.Request<{}, {}, null>, res: express.Response): Promise<interfaces.IHttpActionResult> {
        return this.actionWrapper(req, res, async (au) => {
            if (!au.checkAccess(RoleContentType.ADMIN, RoleAction.EDIT_SETTINGS)) return this.json({}, 401);
            else {
                return this.repositories.churchSetting.convertAllToModel(au.churchId, await this.repositories.churchSetting.loadAll(au.churchId));
            }
        })
    }

    @httpPost("/")
    public async post(req: express.Request<{}, {}, ChurchSetting[]>, res: express.Response): Promise<interfaces.IHttpActionResult> {
        return this.actionWrapper(req, res, async (au) => {
            if (!au.checkAccess(RoleContentType.ADMIN, RoleAction.EDIT_SETTINGS)) return this.json({}, 401);
            else {
                const promises: Promise<ChurchSetting>[] = []
                req.body.forEach(churchSetting => {
                    churchSetting.churchId = au.churchId;
                    promises.push(this.repositories.churchSetting.save(churchSetting));
                })
                const result = await Promise.all(promises);
                return this.repositories.churchSetting.convertAllToModel(au.churchId, result);
            }
        })
    }
}