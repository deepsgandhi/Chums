import { VisitSessionInterface } from "./ApiHelper";

export class VisitSessionHelper {

    public static getByServiceTimeId(visitSessions: VisitSessionInterface[], serviceTimeId: number): VisitSessionInterface[] {
        var result: VisitSessionInterface[] = [];
        visitSessions.forEach(vs => { if (vs.session?.serviceTimeId === serviceTimeId) result.push(vs) });
        return result;
    }

    public static setValue(visitSessions: VisitSessionInterface[], serviceTimeId: number, groupId: number, displayName: string) {
        for (let i = visitSessions.length - 1; i >= 0; i--) {
            if (visitSessions[i].session?.serviceTimeId === serviceTimeId) visitSessions.splice(i, 1);
        }
        if (groupId > 0) visitSessions.push({ session: { serviceTimeId: serviceTimeId, groupId: groupId, displayName: displayName } });
    }

}

