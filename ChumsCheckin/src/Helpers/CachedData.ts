import { PersonInterface, ServiceTimeInterface, VisitInterface, ChurchInterface } from "./ApiHelper";

export class CachedData {
    static pendingVisits: VisitInterface[] = [];
    static existingVisits: VisitInterface[] = [];

    static church: ChurchInterface | null = null;
    static householdId: number = 0;
    static householdMembers: PersonInterface[] = [];
    static serviceId: number = 0;
    static serviceTimes: ServiceTimeInterface[] = [];
}

