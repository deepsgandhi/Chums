import React from 'react'
import { 
    InputBox, 
    Search, 
    MergeModal, 
    PersonInterface, 
    ApiHelper, 
    GroupMemberInterface, 
    NoteInterface, 
    VisitInterface,
    DonationInterface,
    FormSubmissionInterface 
} from './'
import { useHistory } from 'react-router-dom'

interface Props {
    hideMergeBox: () => void,
    person: PersonInterface,
}

export const Merge: React.FunctionComponent<Props> = (props) => {
    const [searchResults, setSearchResults] = React.useState<PersonInterface[]>(null);
    const [showMergeModal, setShowMergeModal] = React.useState<boolean>(false);
    const [personToMerge, setPersonToMerge] = React.useState<PersonInterface>(null);
    const [mergeInProgress, setMergeInProgress] = React.useState<boolean>(false);
    const history = useHistory()

    const handleSave = () => {
        props.hideMergeBox();
    }

    const handleMerge = (personId: number) => {
        const person: PersonInterface[] = [...searchResults].filter(p => p.id === personId);
        setPersonToMerge(person[0]);
        setShowMergeModal(true);
    }

    const search = async (searchText: string) => {
        try {
            const results: PersonInterface[] = await ApiHelper.apiGet(`/people/search?term=${escape(searchText)}`);
            const filteredList = results.filter(person => person.id !== props.person.id);

            setSearchResults(filteredList);
        } catch (err) {
            console.log("Error occured in fetching search results: ", err);
        }

    }

    const fetchHouseholdMembers = async (householdId: number) => {       
        try {
            const members: PersonInterface[] = await ApiHelper.apiGet('/people/household/' + householdId);
            return members;        
        } catch (err) {
            console.log('Error occured in fetching household members: ', err);           
        }
    }

    const fetchGroupMembers = async (personId: number) => {
        try {
            const groups: GroupMemberInterface[] = await ApiHelper.apiGet(`/groupmembers?personId=${personId}`);
            return groups;
        } catch (err) {
            console.log("Error in fetching group's data: ", err);
        }
    }

    const fetchNotes = async (contentId: number) => {
        try {
            const notes: NoteInterface[] = await ApiHelper.apiGet(`/notes/person/${contentId}`);
            return notes;
        } catch (err) {
            console.log("Error in fetching notes: ", err)
        }
    }

    const fetchVisits = async (personId: number) => {
        try {
            const visits: VisitInterface[] = await ApiHelper.apiGet(`/visits?personId=${personId}`);
            return visits;
        } catch (err) {
            console.log('Error in fetching visits: ', err);
        }
    }

    const fetchDonations = async (personId: number) => {
        try {
            const donations: DonationInterface[] = await ApiHelper.apiGet(`/donations?personId=${personId}`);
            return donations;
        } catch (err) {
            console.log('Error in fetching donations: ', err);
        }
    }

    const fetchFormSubmissions = async (personId: number) => {
        try {
            const formSubmissions: FormSubmissionInterface[] = await ApiHelper.apiGet(`/formsubmissions?personId=${personId}`);
            return formSubmissions;
        } catch (err) {
            console.log('Error in fetching form submissions: ', err)
        }
    }

    const merge = async (person: PersonInterface, personToRemove: PersonInterface) => {
        try {
            setMergeInProgress(true);
            const { id, householdId } = personToRemove;
            const householdMembers = await fetchHouseholdMembers(householdId);
            const groupMembers = await fetchGroupMembers(id);
            const notes = await fetchNotes(id);
            const visits = await fetchVisits(id);
            const donations = await fetchDonations(id);
            const formSubmission = await fetchFormSubmissions(id);

            const promises = [];
            householdMembers.forEach(member => {
                member.householdId = person.householdId;
                promises.push(ApiHelper.apiPost('/people', [member]));
            });
            groupMembers.forEach(groupMember => {
                groupMember.personId = person.id;
                promises.push(ApiHelper.apiPost('/groupmembers', [groupMember]));
            });
            notes.forEach(note => {
                note.contentId = person.id;
                promises.push(ApiHelper.apiPost('/notes', [note]));
            })
            visits.forEach(visit => {
                visit.personId = person.id;
                promises.push(ApiHelper.apiPost(`/visits`, [visit]));
            })
            donations.forEach(donation => {
                donation.personId = person.id;
                promises.push(ApiHelper.apiPost('/donations', [donation]));
            })
            formSubmission.forEach(form => {
                form.contentId = person.id;
                promises.push(ApiHelper.apiPost('/formsubmissions', [form]));
            })
            promises.push(ApiHelper.apiPost(`/people`, [person]));
            promises.push(ApiHelper.apiDelete(`/people/${id}`));
            Promise.all(promises).then(() => {
                setShowMergeModal(false);
                history.push('/people');
                setMergeInProgress(false);
            })
        } catch (err) {
            setMergeInProgress(false);
            console.log('Error in merging records...!!', err);
        }
    }

    const person1 = {...props.person};
    return (
        <>
            <MergeModal show={showMergeModal} onHide={() => setShowMergeModal(false)} person1={person1} person2={personToMerge} merge={merge} mergeInProgress={mergeInProgress} />
            <InputBox id="mergeBox" headerIcon="fas fa-user-plus" headerText="Merge Records" saveFunction={handleSave}>
                <Search handleSearch={search} searchResults={searchResults} buttonText="merge" handleClickAction={handleMerge} />
            </InputBox>
        </>
    )
}
