import React from 'react';
import { PersonView, PersonEdit, PersonInterface } from './'
import { UserHelper } from '../../../Utils';

interface Props {
    person: PersonInterface,
    photoUrl: string,
    togglePhotoEditor: (show: boolean) => void,
}

export const Person: React.FC<Props> = (props) => {
    const [mode, setMode] = React.useState('display');
    const [person, setPerson] = React.useState(props.person);
    const [addFormId, setAddFormId] = React.useState(0);
    const handleEdit = (e: React.MouseEvent) => { e.preventDefault(); setMode('edit'); }
    const handleAddForm = (formId: number) => { setMode('display'); setAddFormId(formId); }
    const handleUpdated = (p: PersonInterface) => { setMode('display'); setPerson(p); }
    const getEditFunction = () => { return (UserHelper.checkAccess('People', 'Edit')) ? handleEdit : null; }

    React.useEffect(() => setPerson(props.person), [props.person]);

    if (mode === 'display') return <PersonView person={person} editFunction={getEditFunction()} addFormId={addFormId} photoUrl={props.photoUrl} />
    else return <PersonEdit person={person} updatedFunction={handleUpdated} addFormFunction={handleAddForm} photoUrl={props.photoUrl} togglePhotoEditor={props.togglePhotoEditor} />
}