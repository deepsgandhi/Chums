import React, {useCallback, useRef} from 'react';
import { DisplayBox, AttendanceRecordInterface, Helper, AttendanceHelper, AttendanceFilterInterface } from './';
import { Chart } from 'react-google-charts';
import { Row, Col, FormGroup, FormControl, FormLabel, Table } from 'react-bootstrap';

interface Props { filter: AttendanceFilterInterface }

export const Attendance: React.FC<Props> = (props) => {

    const [filter, setFilter] = React.useState<AttendanceFilterInterface>(props.filter);
    const [records, setRecords] = React.useState<AttendanceRecordInterface[]>([]);
    const isSubscribed = useRef(true);

    const loadData = useCallback(() => {
        AttendanceHelper.loadData(filter).then((data: AttendanceRecordInterface[]) => { 
            if(isSubscribed.current) setRecords(data)
        });
    },[filter, isSubscribed]);

    const getWeekRecords = (weekNum: number) => {
        var result: AttendanceRecordInterface[] = [];
        for (let i = 0; i < records.length; i++) if (records[i].week === weekNum) result.push(records[i]);
        return result;
    }

    const getNameRecord = (weekRecords: AttendanceRecordInterface[], displayName: string) => {
        for (let i = 0; i < weekRecords.length; i++) if (AttendanceHelper.getDisplayName(weekRecords[i]) === displayName) return weekRecords[i];
        return null;
    }

    const getRows = () => {
        var totals: any = {};
        var displayNames: string[] = [];
        for (let i = 0; i < records.length; i++) {
            var name = AttendanceHelper.getDisplayName(records[i]);
            var count = records[i].count;
            if (displayNames.indexOf(name) === -1) {
                displayNames.push(name);
                totals[name] = count;
            }
        }

        var rows: JSX.Element[] = [];
        for (let i = 0; i < displayNames.length; i++) rows.push(<tr key={i}><td>{displayNames[i]}</td><td>{totals[displayNames[i]]}</td></tr>);
        return rows;
    }

    const getChartRows = () => {
        var displayNames: string[] = [];
        var weeks: number[] = [];
        for (let i = 0; i < records.length; i++) {
            var displayName = AttendanceHelper.getDisplayName(records[i]);
            if (displayNames.indexOf(displayName) === -1) displayNames.push(displayName);
            if (weeks.indexOf(records[i].week) === -1) weeks.push(records[i].week);
        }

        var rows = [];

        var header: any[] = ['Grouping'];
        for (let i = 0; i < displayNames.length; i++) header.push(displayNames[i]);
        header.push({ role: 'annotation' });
        rows.push(header);

        for (let i = 0; i < weeks.length; i++) {
            var weekRecords: AttendanceRecordInterface[] = getWeekRecords(weeks[i]);
            var weekName = (filter.trend) ? Helper.formatHtml5Date(Helper.getWeekSunday(new Date().getFullYear(), weeks[i])) : 'Total';
            var row: any[] = [weekName];
            for (let j = 0; j < displayNames.length; j++) {
                var nameRecord: AttendanceRecordInterface = getNameRecord(weekRecords, displayNames[j]);
                row.push((nameRecord === null) ? 0 : nameRecord.count);
            }
            row.push('');
            rows.push(row);
        }

        return rows;
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        var f = { ...filter } as AttendanceFilterInterface;
        f.groupBy = e.currentTarget.value;
        setFilter(f);
    }


    React.useEffect(()=>{ isSubscribed.current=true; loadData(); return ()=>{isSubscribed.current = false;}}, [filter, loadData]);
    React.useEffect(() => { setFilter(props.filter) }, [props.filter]);

    if (records.length === 0) return (<DisplayBox id="attendanceBox" headerIcon="far fa-calendar-alt" headerText="Attendance History" ><p>No records found.</p></DisplayBox>);
    else return (
        <DisplayBox id="attendanceBox" headerIcon="far fa-calendar-alt" headerText="Attendance History" >
            <Row>
                <Col lg={{ span: 6, offset: 6 }}>
                    <FormGroup>
                        <FormLabel>Grouping</FormLabel>
                        <FormControl as="select" value={filter.groupBy} onChange={handleChange} >
                            <option value="campusName">Campus</option>
                            <option value="serviceName">Service</option>
                            <option value="serviceTimeName">Service Time</option>
                            <option value="categoryName">Category</option>
                            <option value="groupName">Group</option>
                            <option value="gender">Gender</option>
                        </FormControl>
                    </FormGroup>
                </Col>
            </Row>
            <Chart
                graphID="column-chart-cy"
                chartType="ColumnChart"
                data={getChartRows()}
                width="100%"
                height="400px"
                options={{ height: 400, legend: { position: 'top', maxLines: 3 }, bar: { groupWidth: '75%' }, isStacked: true }}
            />

            <hr />
            <Table>
                <tbody>
                    <tr><th>{AttendanceHelper.getGroupingName(filter.groupBy)}</th><th>Attendance</th></tr>
                    {getRows()}
                </tbody>
            </Table>
        </DisplayBox>
    )
}

