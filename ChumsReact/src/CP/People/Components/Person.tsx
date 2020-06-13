import React from 'react';
import { PersonView, PersonEdit, PersonInterface } from './'

interface Props {
    person: PersonInterface
}

export const Person: React.FC<Props> = (props) => {
    const [mode, setMode] = React.useState('display');
    const [person, setPerson] = React.useState(props.person);
    const [addFormId, setAddFormId] = React.useState(0);
    const handleEdit = () => { setMode('edit'); }
    const handleAddForm = (formId: number) => { setMode('display'); setAddFormId(formId); }
    const handleUpdated = (p: PersonInterface) => { setMode('display'); setPerson(p); }

    React.useEffect(() => setPerson(props.person), [props.person]);

    if (mode === 'display') return <PersonView person={person} editFunction={handleEdit} addFormId={addFormId} />
    else return <PersonEdit person={person} updatedFunction={handleUpdated} addFormFunction={handleAddForm} />
}