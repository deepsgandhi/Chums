
import { EnvironmentHelper } from "./EnvironmentHelper";


//AccessManagment
export interface ApplicationInterface { name: string, permissions: RolePermissionInterface[] }
export interface ChurchInterface { id?: number, name: string, registrationDate?: Date, apps?: ApplicationInterface[] }
export interface LoginResponseInterface { user: UserInterface, churches: ChurchInterface[], token: string, errors: string[] }
export interface RegisterInterface { churchName?: string, displayName?: string, email?: string, password?: string }
export interface RoleInterface { id?: number, churchId?: number, appName?: string, name?: string }
export interface RolePermissionInterface { id?: number, churchId?: number, roleId?: number, appName?: string, contentType?: string, contentId?: number, action?: string }
export interface RoleMemberInterface { id?: number, churchId?: number, roleId?: number, userId?: number, user?: UserInterface }
export interface ResetPasswordRequestInterface { userEmail: string, fromEmail: string, subject: string, body: string }
export interface ResetPasswordResponseInterface { emailed: boolean }
export interface SwitchAppRequestInterface { appName: string, churchId: number }
export interface UserInterface { id?: number, email?: string, authGuid?: string, displayName?: string, registrationDate?: Date, lastLogin?: Date, password?: string }


export interface GroupInterface { id?: number, name?: string, categoryName?: string, parentPickup?: boolean }
export interface NameInterface { first?: string, middle?: string, last?: string, nick?: string, display?: string }
export interface PersonInterface { id?: number, name: NameInterface, membershipStatus?: string, gender?: string, birthDate?: Date, maritalStatus?: string, anniversary?: Date, photo?: string, photoUpdated?: Date, householdId?: number, householdRole?: string, userId?: number }
export interface ServiceInterface { id?: number, campusId?: number, name?: string }
export interface ServiceTimeInterface { id?: number, name?: string, groups?: GroupInterface[] }
export interface SessionInterface { id?: number, groupId?: number, serviceTimeId?: number, sessionDate?: Date, displayName?: string }
export interface VisitInterface { id?: number, personId?: number, serviceId?: number, groupId?: number, visitDate?: Date, visitSessions?: VisitSessionInterface[], person?: PersonInterface }
export interface VisitSessionInterface { id?: number, visitId?: number, sessionId?: number, visit?: VisitInterface, session?: SessionInterface }



export class ApiHelper {
    static jwt = '';
    static amJwt = '';

    static getUrl(path: string) {
        if (path.indexOf("://") > -1) return path;
        else return EnvironmentHelper.ChumsApiUrl + path;
    }

    static getAccessUrl(path: string) {
        if (path.indexOf("://") > -1) return path;
        else return EnvironmentHelper.AccessManagementApiUrl + path;
    }

    static async apiGet(path: string) {
        try {
            const requestOptions = { method: 'GET', headers: { 'Authorization': 'Bearer ' + this.jwt } };
            return fetch(this.getUrl(path), requestOptions).then(response => response.json())
        } catch (e) {
            throw (e);
        }
    }

    static async accessGet(path: string) {
        try {
            const requestOptions = { method: 'GET', headers: { 'Authorization': 'Bearer ' + this.amJwt } };
            return fetch(this.getAccessUrl(path), requestOptions).then(response => response.json())
        } catch (e) {
            throw (e);
        }
    }

    static async apiPost(path: string, data: any[] | {}) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + this.jwt, 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch(this.getUrl(path), requestOptions).then(response => response.json())
    }

    static async accessPost(path: string, data: any[] | {}) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + this.amJwt, 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch(this.getAccessUrl(path), requestOptions).then(response => response.json())
    }

    static async apiDelete(path: string) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + this.jwt }
        };
        return fetch(this.getUrl(path), requestOptions);
    }

    static async accessDelete(path: string) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + this.amJwt }
        };
        return fetch(this.getAccessUrl(path), requestOptions);
    }

    static async apiPostAnonymous(path: string, data: any[] | {}) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch(this.getUrl(path), requestOptions).then(response => response.json())
    }























    /*
    
    
        public static async login(apiName: string, value: object) {
            try {
                const response = await fetch(EnvironmentHelper.AccessManagementApiUrl + apiName, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value)
                });
                const resjson = await response.json();
                return resjson;
            } catch (error) {
                console.error(error);
                return ('error');
            }
        }
    */

    public static getApi(apiName: string, param: string) {
        return (

            fetch(EnvironmentHelper.ChumsApiUrl + apiName + param, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.jwt,
                    'Accept': 'application/json'
                },
            }).then((response) => response.json()).then((resjson) => {

                return resjson;
            }).catch((error) => {
                console.error(error);
                return ('error')
            })
        )
    }

    public static getSearchDetail(apiName: string, apiParm: number) {

        return (
            fetch(EnvironmentHelper.ChumsApiUrl + apiName + apiParm, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.jwt,
                    'Accept': 'application/json'
                },
            }).then((response) => response.json()).then((resjson) => {

                return resjson;
            }).catch((error) => {
                console.error(error);
                return ('error')
            })
        )
    }
}