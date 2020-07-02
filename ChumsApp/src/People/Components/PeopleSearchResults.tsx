import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { PersonHelper, ErrorMessages, ApiHelper, PersonInterface, HouseholdInterface, UserHelper } from '.';
import { Row, Col, FormControl, Button, Table } from 'react-bootstrap';

interface Props {
    people: PersonInterface[]
}

export const PeopleSearchResults: React.FC<Props> = (props) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [redirectUrl, setRedirectUrl] = React.useState('');
    const [errors, setErrors] = React.useState<string[]>([]);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        if (validate()) {
            ApiHelper.apiGet('/campuses').then(data => {
                var campusId = data[0].id;
                var person = { firstName: firstName, lastName: lastName, campuseId: campusId } as PersonInterface;
                var household = { name: lastName } as HouseholdInterface;
                var promises = [];
                promises.push(ApiHelper.apiPost('/people', [person]).then(data => person.id = data[0]));
                promises.push(ApiHelper.apiPost('/households', [household]).then(data => household.id = data[0]));
                Promise.all(promises).then(() => {
                    var householdMember = { householdId: household.id, personId: person.id, role: 'Head' };
                    ApiHelper.apiPost('/householdmembers/' + household.id, [householdMember]).then(() => setRedirectUrl('/people/' + person.id));
                });
            });
        }
    }

    const validate = () => {
        var errors = []
        if (firstName.trim() === '') errors.push('First name cannot be blank.');
        if (lastName.trim() === '') errors.push('Last name cannot be blank.');
        setErrors(errors);
        return errors.length === 0;
    }

    const getRows = () => {
        var result = [];
        for (var i = 0; i < props.people.length; i++) {
            var p = props.people[i];
            result.push(<tr key={p.id}>
                <td><img src={PersonHelper.getPhotoUrl(p)} alt="avatar" /></td>
                <td><Link to={"/people/" + p.id.toString()}>{p.displayName}</Link></td>
            </tr>);
        }
        return result;
    }
    const getAddPerson = () => {
        if (!UserHelper.checkAccess('People', 'Edit')) return (<></>);
        else return (
            <>
                <hr />
                <ErrorMessages errors={errors} />
                <b>Add a New Person</b>
                <Row>
                    <Col><FormControl placeholder="First Name" name="firstName" value={firstName} onChange={e => setFirstName(e.currentTarget.value)} /></Col>
                    <Col><FormControl placeholder="Last Name" name="lastName" value={lastName} onChange={e => setLastName(e.currentTarget.value)} /></Col>
                    <Col><Button variant="primary" onClick={handleAdd} >Add</Button></Col>
                </Row>
            </>);
    }


    if (redirectUrl !== '') return <Redirect to={redirectUrl}></Redirect>;
    else if (props.people === undefined || props.people === null || props.people.length === 0) return <></>
    else {
        var result =
            <>
                <Table id="peopleTable">
                    <thead><tr><th></th><th>Name</th></tr></thead>
                    <tbody>{getRows()}</tbody>
                </Table>
                {getAddPerson()}
            </>;
        return result;
    }
}