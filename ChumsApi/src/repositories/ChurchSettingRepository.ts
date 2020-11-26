import { injectable } from 'inversify'
import { DB } from '../db'
import { ChurchSetting } from '../models'

@injectable()
export class ChurchSettingRepository {

    public async save(churchSetting: ChurchSetting) {
        if (churchSetting.id > 0) {
            return this.update(churchSetting);
        } else {
            return this.create(churchSetting);
        }
    }

    public async create(churchSetting: ChurchSetting) {
        return DB.query(
            "INSERT INTO churchSettings (churchId, keyName, value) VALUES (?, ?, ?)",
            [churchSetting.churchId, churchSetting.keyName, churchSetting.value]
        ).then((row: any) => {
            churchSetting.id = row.insertId;
            return churchSetting;
        })
    }

    public async update(churchSetting: ChurchSetting) {
        return DB.query(
            "UPDATE churchSettings SET churchId=?, keyName=?, value=? WHERE id=? AND churchId=?",
            [churchSetting.churchId, churchSetting.keyName, churchSetting.value, churchSetting.id, churchSetting.churchId]
        ).then(() => churchSetting)
    }

    public async loadAll(churchId: number) {
        return DB.query("SELECT * FROM churchSettings WHERE churchId=?;", [churchId]);
    }

    public convertToModel(churchId: number, data: any) {
        const result: ChurchSetting = {
            id: data.id,
            keyName: data.keyName,
            value: data.value
        };
        return result;
    }

    public convertAllToModel(churchId: number, data: any[]) {
        const result: ChurchSetting[] = [];
        data.forEach(d => result.push(this.convertToModel(churchId, d)));
        return result;
    }
}