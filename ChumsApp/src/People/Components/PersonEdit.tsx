import React from 'react';
import { PersonHelper, Helper, StateOptions, InputBox, ApiHelper, PersonInterface, AddForm, UserHelper } from './'
import { Redirect } from 'react-router-dom';
import { Row, Col, FormControl, FormGroup, FormLabel } from 'react-bootstrap';

interface Props {
    updatedFunction: (person: PersonInterface) => void,
    addFormFunction: (formId: number) => void
    togglePhotoEditor: (show: boolean) => void,
    person: PersonInterface,
    photoUrl: string,
}

export const PersonEdit: React.FC<Props> = (props) => {
    const [person, setPerson] = React.useState<PersonInterface>({} as PersonInterface);
    const [redirect, setRedirect] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        var p = { ...person };
        const key = e.currentTarget.name;
        const val = e.currentTarget.value;
        switch (key) {
            case 'firstName': p.firstName = val; break;
            case 'middleName': p.middleName = val; break;
            case 'lastName': p.lastName = val; break;
            case 'nickName': p.nickName = val; break;
            case 'membershipStatus': p.membershipStatus = val; break;
            case 'gender': p.gender = val; break;
            case 'birthDate':
                if (val === '') p.birthDate = null; else p.birthDate = new Date(val);
                break;
            case 'maritalStatus': p.maritalStatus = val; break;
            case 'anniversary':
                if (val === '') p.anniversary = null; else p.anniversary = new Date(val);
                break;
            case 'address1': p.address1 = val; break;
            case 'address2': p.address2 = val; break;
            case 'city': p.city = val; break;
            case 'state': p.state = val; break;
            case 'zip': p.zip = val; break;
            case 'homePhone': p.homePhone = val; break;
            case 'workPhone': p.workPhone = val; break;
            case 'mobilePhone': p.mobilePhone = val; break;
            case 'email': p.email = val; break;
        }
        setPerson(p);
    }

    const handleCancel = () => props.updatedFunction(person);

    const handleDelete = () => {
        if (window.confirm('Are you sure you wish to permanently delete this person record?'))
            ApiHelper.apiDelete('/people/' + person.id.toString()).then(() => setRedirect('/people'));
    }

    const handleSave = () => {
        console.log([person]);
        ApiHelper.apiPost('/people/', [person])
            .then(data => {
                var p = { ...person };
                p.id = data[0];
                p.displayName = PersonHelper.getDisplayName(p.firstName, p.lastName, p.nickName);
                setPerson(p);
                props.updatedFunction(p);
            });
    }


    const getPhoto = () => {
        if (props.person) {
            var url = (props.photoUrl === null) ? PersonHelper.getPhotoUrl(props.person) : props.photoUrl;
            return (<a href="about:blank" onClick={(e: React.MouseEvent) => { e.preventDefault(); props.togglePhotoEditor(true) }}>
                <img src={url} className="img-fluid profilePic" id="imgPreview" alt="avatar" />
            </a>);
        } else return;
    }

    const getAddForm = () => { return (UserHelper.checkAccess('Forms', 'Edit')) ? (<AddForm person={person} addFormFunction={props.addFormFunction} />) : null; }

    React.useEffect(() => setPerson(props.person), [props.person]);

    if (redirect !== '') return <Redirect to={redirect} />
    else {
        return (
            <InputBox headerIcon="fas fa-user" headerText="Personal Details" cancelFunction={handleCancel} deleteFunction={handleDelete} saveFunction={handleSave} >
                <Row>
                    <Col xs={3}>{getPhoto()}</Col>
                    <Col xs={9}>
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl name="firstName" value={person?.firstName || ''} onChange={handleChange} />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <FormLabel>Middle Name</FormLabel>
                                    <FormControl name="middleName" value={person?.middleName || ''} onChange={handleChange} />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl name="lastName" value={person?.lastName || ''} onChange={handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <FormLabel>Nickname</FormLabel>
                                    <FormControl name="nickName" value={person?.nickName || ''} onChange={handleChange} />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <FormLabel>Membership Status</FormLabel>
                                    <FormControl as="select" name="membershipStatus" value={person?.membershipStatus || ''} onChange={handleChange}>
                                        <option value="Visitor">Visitor</option>
                                        <option value="Member">Member</option>
                                        <option value="Staff">Staff</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl as="select" name="gender" value={person?.gender || ''} onChange={handleChange}>
                                        <option value="Unspecified">Unspecified</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <FormLabel>Birthdate</FormLabel>
                                    <FormControl type="date" name="birthDate" value={Helper.formatHtml5Date(person?.birthDate)} onChange={handleChange} />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <FormLabel>Marital Status</FormLabel>
                                    <FormControl as="select" name="maritalStatus" value={person?.maritalStatus || ''} onChange={handleChange}>
                                        <option value="Unknown">Visitor</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Widowed">Widowed</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <FormLabel>Anniversary</FormLabel>
                                    <FormControl type="date" name="anniversary" value={Helper.formatHtml5Date(person?.anniversary)} onChange={handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>


                <Row>
                    <Col xs={6}>
                        <div className="section">Address</div>
                        <FormGroup>
                            <FormLabel>Line 1</FormLabel>
                            <FormControl name="address1" value={person?.address1 || ''} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Line 2</FormLabel>
                            <FormControl name="address2" value={person?.address2 || ''} onChange={handleChange} />
                        </FormGroup>
                        <Row>
                            <Col xs={6}>
                                <FormGroup>
                                    <FormLabel>City</FormLabel>
                                    <FormControl type="text" name="city" value={person?.city || ''} onChange={handleChange} />
                                </FormGroup>
                            </Col>
                            <Col xs={3}>
                                <FormGroup>
                                    <FormLabel>State</FormLabel>
                                    <FormControl as="select" name="state" value={person?.state || ''} onChange={handleChange}>
                                        <StateOptions />
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col xs={3}>
                                <FormGroup>
                                    <FormLabel>Zip</FormLabel>
                                    <FormControl type="text" name="zip" value={person?.zip || ''} onChange={handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={3}>
                        <div className="section">Phone</div>
                        <FormGroup>
                            <FormLabel>Home</FormLabel>
                            <FormControl type="text" name="homePhone" value={person?.homePhone || ''} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Work</FormLabel>
                            <FormControl type="text" name="workPhone" value={person?.workPhone || ''} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Mobile</FormLabel>
                            <FormControl type="text" name="mobilePhone" value={person?.mobilePhone || ''} onChange={handleChange} />
                        </FormGroup>
                    </Col>
                    <Col xs={3}>
                        <div className="section">Email</div>
                        <FormGroup>
                            <FormLabel>Email</FormLabel>
                            <FormControl type="text" name="email" value={person?.email || ''} onChange={handleChange} />
                        </FormGroup>
                    </Col>
                </Row>
                {getAddForm()}
            </InputBox>
        )
    }




}