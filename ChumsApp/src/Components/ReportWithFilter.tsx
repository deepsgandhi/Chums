import React, {useCallback, useRef} from 'react';
import { ReportInterface, ReportValueInterface, ReportHelper, ApiHelper } from './';
import { ReportView, ReportFilter } from "../Reports/Components"
import { Row, Col } from 'react-bootstrap';

interface Props { keyName: string }

export const ReportWithFilter: React.FC<Props> = (props) => {
    const [report, setReport] = React.useState({} as ReportInterface);
    const isSubscribed = useRef(true);


    const loadReport = useCallback(() => {
        if (props.keyName !== undefined && props.keyName !== null && props.keyName !== "") {
            ApiHelper.apiGet('/reports/keyName/' + props.keyName).then(data => {
                if (isSubscribed.current)
                {
                    var r: ReportInterface = data;
                    ReportHelper.setDefaultValues(r);
                    setReport(r);
                }
            });
        }
    }, [props])

    const runReport = (r: ReportInterface) => {
        const postData = [{ id: r.id, values: r.values }]
        ApiHelper.apiPost('/reports/run', postData).then(data => setReport(data[0]));
    }

    const handleFilterUpdate = (values: ReportValueInterface[]) => {
        var r = { ...report };
        r.values = values;
        runReport(r);
    }

    React.useEffect(()=>{
        isSubscribed.current=true;
        loadReport();
        return () => { isSubscribed.current=false }
    }, [props.keyName, loadReport]);

    return (<>
        <Row>
            <Col lg={8}>
                <ReportView report={report} />
            </Col>
            <Col lg={4}>
                <ReportFilter report={report} updateFunction={handleFilterUpdate} />
            </Col>
        </Row>
    </>);
}


