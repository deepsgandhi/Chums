import React from 'react';
import { ApiHelper, PersonInterface, PersonHelper } from './';
import { Table, Button, FormControl, InputGroup } from 'react-bootstrap';
import { UpdateHouseHold } from '../People/Components'

interface Props { addFunction: (person: PersonInterface) => void, person? : PersonInterface }

export const PersonAdd: React.FC<Props> = (props) => {
    const [searchResults, setSearchResults] = React.useState<PersonInterface[]>(null);
    const [searchText, setSearchText] = React.useState('');
    const [showUpdateAddressModal, setShowUpdateAddressModal] = React.useState<boolean>(false)
    const [text, setText] = React.useState('');
    const [selectedPersonIndex, setSelectedPersonIndex] = React.useState<number>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { e.preventDefault(); setSearchText(e.currentTarget.value); }
    const handleKeyDown = (e: React.KeyboardEvent<any>) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch(null); } }
    const handleSearch = (e: React.MouseEvent) => {
        if (e !== null) e.preventDefault();
        ApiHelper.apiGet('/people/search?term=' + escape(searchText)).then(data => setSearchResults(data));
    }
    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        var anchor = e.currentTarget as HTMLAnchorElement;
        var idx = anchor.getAttribute('data-index');
        var sr: PersonInterface[] = [...searchResults];       
        var person: PersonInterface = sr.splice(parseInt(idx), 1)[0];
        setSelectedPersonIndex(parseInt(idx))
        const {name: {
            first
        }, contactInfo} = props.person;
        if (!PersonHelper.checkAddressAvailabilty(props.person)) { 
            addPerson(parseInt(idx))
            return
        }
        setText(`Would you like to update ${person.name.first}'s address to match ${first}'s (${PersonHelper.addressToString(contactInfo)})?`)
        setShowUpdateAddressModal(true)                
    }

    const addPerson = (idx? : number) => {
        const updatedSearch: PersonInterface[] = [...searchResults]       
        const person: PersonInterface = updatedSearch.splice(idx || selectedPersonIndex, 1)[0];
        setSearchResults(updatedSearch);
        props.addFunction(person);
    }

    const handleNo = () => {
        setShowUpdateAddressModal(false);
        addPerson();
    }

    const handleYes = async () => {
        setShowUpdateAddressModal(false);
        const person: PersonInterface = [...searchResults].splice(selectedPersonIndex, 1)[0];
        person.contactInfo = PersonHelper.changeOnlyAddress(person.contactInfo, props.person.contactInfo)
        try {
            await ApiHelper.apiPost('/people', [person]);
         } catch (err) {
        console.log(`error in updating ${person.name.display}'s address`);
        }
        addPerson();
    }

    var rows = [];
    if (searchResults !== null) {
        for (var i = 0; i < searchResults.length; i++) {
            var sr = searchResults[i];
            rows.push(
                <tr key={sr.id}>
                    <td><img src={PersonHelper.getPhotoUrl(sr)} alt="avatar" /></td>
                    <td>{sr.name.display}</td>
                    <td><a className="text-success" data-index={i} onClick={handleAdd}><i className="fas fa-user"></i> Add</a></td>
                </tr>
            );
        }
    }

    return (
        <>
            <UpdateHouseHold show={showUpdateAddressModal} onHide={() => setShowUpdateAddressModal(false)} handleNo={handleNo} handleYes={handleYes} text={text} />
            <InputGroup>
                <FormControl id="personAddText" value={searchText} onChange={handleChange} onKeyDown={handleKeyDown} />
                <div className="input-group-append"><Button id="personAddButton" variant="primary" onClick={handleSearch} ><i className="fas fa-search"></i> Search</Button></div>
            </InputGroup>
            <Table size="sm" id="householdMemberAddTable"><tbody>{rows}</tbody></Table>
        </>
    );
}
