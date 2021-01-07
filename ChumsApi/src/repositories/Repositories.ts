import {
  AttendanceRepository,
  CampusRepository,
  ChurchSettingRepository,
  DonationRepository,
  DonationBatchRepository,
  FundDonationRepository,
  FundRepository,
  GroupMemberRepository,
  GroupRepository,
  GroupServiceTimeRepository,
  HouseholdRepository,
  PersonRepository,
  ReportRepository,
  ServiceRepository,
  ServiceTimeRepository,
  SessionRepository,
  VisitRepository,
  VisitSessionRepository
} from ".";

export class Repositories {
  public attendance: AttendanceRepository;
  public campus: CampusRepository;
  public churchSetting: ChurchSettingRepository;
  public donationBatch: DonationBatchRepository;
  public donation: DonationRepository;
  public fundDonation: FundDonationRepository;
  public fund: FundRepository;
  public groupMember: GroupMemberRepository;
  public group: GroupRepository;
  public groupServiceTime: GroupServiceTimeRepository;
  public household: HouseholdRepository;
  public person: PersonRepository;
  public report: ReportRepository;
  public service: ServiceRepository;
  public serviceTime: ServiceTimeRepository;
  public session: SessionRepository;
  public visit: VisitRepository;
  public visitSession: VisitSessionRepository;


  private static _current: Repositories = null;
  public static getCurrent = () => {
    if (Repositories._current === null) Repositories._current = new Repositories();
    return Repositories._current;
  }


  constructor() {
    this.attendance = new AttendanceRepository();
    this.campus = new CampusRepository();
    this.churchSetting = new ChurchSettingRepository();
    this.donationBatch = new DonationBatchRepository();
    this.donation = new DonationRepository();
    this.fundDonation = new FundDonationRepository();
    this.fund = new FundRepository();
    this.groupMember = new GroupMemberRepository();
    this.group = new GroupRepository();
    this.groupServiceTime = new GroupServiceTimeRepository();
    this.household = new HouseholdRepository();
    this.person = new PersonRepository();
    this.report = new ReportRepository();
    this.service = new ServiceRepository();
    this.serviceTime = new ServiceTimeRepository();
    this.session = new SessionRepository();
    this.visit = new VisitRepository();
    this.visitSession = new VisitSessionRepository();
  }
}
