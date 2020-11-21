import { UserInterface, ChurchInterface, SwitchAppRequestInterface, ApiHelper, EnvironmentHelper, LoginResponseInterface, PersonInterface } from './'
import { UserContextInterface } from '../UserContext';
import { RolePermissionInterface } from './ApiHelper';
import ReactGA from 'react-ga';

export class UserHelper {
    static currentChurch: ChurchInterface;
    static churches: ChurchInterface[];
    static user: UserInterface;
    static currentPermissions: RolePermissionInterface[];
    static person: PersonInterface;
    static churchChanged: boolean = false;

    static selectChurch = (churchId: number, context: UserContextInterface) => {
        var church = null;
        UserHelper.churches.forEach(c => { if (c.id === churchId) church = c; });
        if (church === null) window.location.reload();
        else {
            UserHelper.currentChurch = church;
            UserHelper.currentChurch.apps.forEach(app => {
                if (app.name === "CHUMS") {
                    UserHelper.currentPermissions = app.permissions;
                    console.log(UserHelper.currentPermissions);
                }
            })


            if (EnvironmentHelper.GoogleAnalyticsTag!=="") ReactGA.event({ action:"Switch Church", category:"Login", dimension1:UserHelper.currentChurch.name });

            const data: SwitchAppRequestInterface = { appName: "CHUMS", churchId: UserHelper.currentChurch.id };
            ApiHelper.apiPost(EnvironmentHelper.AccessManagementApiUrl + '/users/switchApp', data).then((resp: LoginResponseInterface) => {
                ApiHelper.jwt = resp.token;

                if (context.churchName !== "") UserHelper.churchChanged = true;
                context.setChurchName(UserHelper.currentChurch.name);
                ApiHelper.apiGet('/people/userid/' + UserHelper.user.id).then((person: PersonInterface) => {
                    UserHelper.person = person;
                    context.setUserName(UserHelper.currentChurch.id.toString());
                });
            });
        }
    }


    static checkAccess(contentType: string, action: string): boolean {
        var result = false;
        if (UserHelper.currentPermissions !== undefined) {
            UserHelper.currentPermissions.forEach(element => {
                if (element.contentType === contentType && element.action === action) result = true;
            });
        }
        return result;
    }

}

