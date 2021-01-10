import React, { useCallback } from 'react';
import { PersonHelper, Helper, StateOptions, InputBox, ApiHelper, PersonInterface, UpdateHouseHold } from './'
import { Redirect } from 'react-router-dom';
import { Row, Col, FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap';

interface Props {
    id?: string,
    updatedFunction: (person: PersonInterface) => void,
    togglePhotoEditor: (show: boolean) => void,
    person: PersonInterface,
    photoUrl: string,
    showMergeSearch: () => void
}

export const PersonEdit: React.FC<Props> = (props) => {
    const [person, setPerson] = React.useState<PersonInterface>({} as PersonInterface);
    const [redirect, setRedirect] = React.useState('');
    const [showUpdateAddressModal, setShowUpdateAddressModal] = React.useState<boolean>(false)
    const [text, setText] = React.useState('');
    const [members, setMembers] = React.useState<PersonInterface[]>(null)

    const handleKeyDown = (e: React.KeyboardEvent<any>) => { if (e.key === 'Enter') { e.preventDefault(); handleSave(); } }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        var p = { ...person };
        const key = e.currentTarget.name;
        const val = e.currentTarget.value;
        switch (key) {
            case 'firstName': p.name.first = val; break;
            case 'middleName': p.name.middle = val; break;
            case 'lastName': p.name.last = val; break;
            case 'nickName': p.name.nick = val; break;
            case 'membershipStatus': p.membershipStatus = val; break;
            case 'gender': p.gender = val; break;
            case 'birthDate':
                if (val === '') p.birthDate = null; else p.birthDate = new Date(val);
                break;
            case 'maritalStatus': p.maritalStatus = val; break;
            case 'anniversary':
                if (val === '') p.anniversary = null; else p.anniversary = new Date(val);
                break;
            case 'address1': p.contactInfo.address1 = val; break;
            case 'address2': p.contactInfo.address2 = val; break;
            case 'city': p.contactInfo.city = val; break;
            case 'state': p.contactInfo.state = val; break;
            case 'zip': p.contactInfo.zip = val; break;
            case 'homePhone': p.contactInfo.homePhone = val; break;
            case 'workPhone': p.contactInfo.workPhone = val; break;
            case 'mobilePhone': p.contactInfo.mobilePhone = val; break;
            case 'email': p.contactInfo.email = val; break;
        }
        setPerson(p);
    }

    const handleCancel = () => props.updatedFunction(person);

    const handleDelete = () => {
        if (window.confirm('Are you sure you wish to permanently delete this person record?'))
            ApiHelper.apiDelete('/people/' + person.id.toString()).then(() => setRedirect('/people'));
    }

    const handleSave = () => {
        const { contactInfo: contactFromProps } = props.person
        const { contactInfo: contactFromState } = person
        if (members && members.length > 1 && PersonHelper.compareAddress(contactFromProps, contactFromState)) {
            setText(`You updated the address to ${PersonHelper.addressToString(contactFromState)} for ${person.name.display}.  Would you like to apply that to the entire ${person.name.last} family?`)
            setShowUpdateAddressModal(true)
            return;
        }
        updatePerson(person)
    }

    const updatePerson = (person: PersonInterface) => {
        ApiHelper.apiPost('/people/', [person])
            .then(data => {
                var p = { ...person };
                p.id = data[0];
                p.name.display = PersonHelper.getDisplayName(p.name.first, p.name.last, p.name.nick);
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


    const personChanged = useCallback(() => {
        const personDeepCopy: PersonInterface = {
            ...props.person,
            contactInfo: {
                ...props.person.contactInfo
            },
            name: {
                ...props.person.name
            }
        }
        setPerson(personDeepCopy)
    }, [props.person]);
    const photoUrlChanged = useCallback(() => {
        if (props.photoUrl !== null) {
            var p: PersonInterface = { ...person };
            p.photo = props.photoUrl;
            setPerson(p);
        }
    }, [props.photoUrl, person]);

    const handleYes = async () => {
        setShowUpdateAddressModal(false)
        await Promise.all(
            members.map(async member => {
                member.contactInfo = PersonHelper.changeOnlyAddress(member.contactInfo, person.contactInfo)
                try {
                    await ApiHelper.apiPost('/people', [member]);
                } catch (err) {
                    console.log(`error in updating ${person.name.display}'s address`);
                }
            })

        )
        props.updatedFunction(person)
    }

    const handleNo = () => {
        setShowUpdateAddressModal(false)
        updatePerson(person)
    }

    const fetchMembers = () => {
        try {
            if (props.person.householdId != null) {
                ApiHelper.apiGet('/people/household/' + props.person.householdId).then(data => {
                    setMembers(data);
                });
            }
        } catch (err) {
            console.log(`Error occured in fetching household members`);
        }
    }

    const handleMerge = () => {
        props.showMergeSearch();
    }

    React.useEffect(personChanged, [props.person]);
    React.useEffect(photoUrlChanged, [props.photoUrl]);
    React.useEffect(fetchMembers, [props.person])

    if (redirect !== '') return <Redirect to={redirect} />
    else {
        return (
            <>
                <UpdateHouseHold show={showUpdateAddressModal} text={text} onHide={() => setShowUpdateAddressModal(false)} handleNo={handleNo} handleYes={handleYes} />
                <InputBox id={props.id} headerIcon="fas fa-user" headerText="Personal Details" cancelFunction={handleCancel} deleteFunction={handleDelete} saveFunction={handleSave} headerActionContent={<Button id="mergeButton" variant="primary" size="sm" onClick={handleMerge}>Merge</Button>} >
                    <Row>
                        <Col xs={3}>{getPhoto()}</Col>
                        <Col xs={9}>
                            <Row>
                                <Col lg={4}>
                                    <FormGroup>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl name="firstName" value={person?.name?.first || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                                    </FormGroup>
                                </Col>
                                <Col lg={4}>
                                    <FormGroup>
                                        <FormLabel>Middle Name</FormLabel>
                                        <FormControl name="middleName" value={person?.name?.middle || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                                    </FormGroup>
                                </Col>
                                <Col lg={4}>
                                    <FormGroup>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl name="lastName" value={person?.name?.last || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4}>
                                    <FormGroup>
                                        <FormLabel>Nickname</FormLabel>
                                        <FormControl name="nickName" value={person?.name?.nick || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                                    </FormGroup>
                                </Col>
                                <Col lg={4}>
                                    <FormGroup>
                                        <FormLabel>Membership Status</FormLabel>
                                        <FormControl as="select" name="membershipStatus" value={person?.membershipStatus || ''} onChange={handleChange} onKeyDown={handleKeyDown}>
                                            <option value="Visitor">Visitor</option>
                                            <option value="Member">Member</option>
                                            <option value="Staff">Staff</option>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col lg={4}>
                                    <FormGroup>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl as="select" name="gender" value={person?.gender || ''} onChange={handleChange} onKeyDown={handleKeyDown}>
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
                                        <FormControl type="date" name="birthDate" value={Helper.formatHtml5Date(person?.birthDate)} onChange={handleChange} onKeyDown={handleKeyDown} />
                                    </FormGroup>
                                </Col>
                                <Col lg={4}>
                                    <FormGroup>
                                        <FormLabel>Marital Status</FormLabel>
                                        <FormControl as="select" name="maritalStatus" value={person?.maritalStatus || ''} onChange={handleChange} onKeyDown={handleKeyDown}>
                                            <option value="Unknown">Unknown</option>
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
                                        <FormControl type="date" name="anniversary" value={Helper.formatHtml5Date(person?.anniversary)} onChange={handleChange} onKeyDown={handleKeyDown} />
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
                                <FormControl name="address1" value={person?.contactInfo?.address1 || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Line 2</FormLabel>
                                <FormControl name="address2" value={person?.contactInfo?.address2 || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                            </FormGroup>
                            <Row>
                                <Col xs={6}>
                                    <FormGroup>
                                        <FormLabel>City</FormLabel>
                                        <FormControl type="text" name="city" value={person?.contactInfo?.city || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                                    </FormGroup>
                                </Col>
                                <Col xs={3}>
                                    <FormGroup>
                                        <FormLabel>State</FormLabel>
                                        <FormControl as="select" name="state" value={person?.contactInfo?.state || ''} onChange={handleChange} onKeyDown={handleKeyDown}>
                                            <StateOptions />
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={3}>
                                    <FormGroup>
                                        <FormLabel>Zip</FormLabel>
                                        <FormControl type="text" name="zip" value={person?.contactInfo?.zip || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={3}>
                            <div className="section">Phone</div>
                            <FormGroup>
                                <FormLabel>Home</FormLabel>
                                <FormControl type="text" name="homePhone" value={person?.contactInfo?.homePhone || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Work</FormLabel>
                                <FormControl type="text" name="workPhone" value={person?.contactInfo?.workPhone || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Mobile</FormLabel>
                                <FormControl type="text" name="mobilePhone" value={person?.contactInfo?.mobilePhone || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                            </FormGroup>
                        </Col>
                        <Col xs={3}>
                            <div className="section">Email</div>
                            <FormGroup>
                                <FormLabel>Email</FormLabel>
                                <FormControl type="text" name="email" value={person?.contactInfo?.email || ''} onChange={handleChange} onKeyDown={handleKeyDown} />
                            </FormGroup>
                        </Col>
                    </Row>
                </InputBox>
            </>
        )
    }




}
