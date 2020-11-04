import React from 'react';
import { FormSubmission, FormSubmissionEdit, FormSubmissionInterface, UserHelper, ApiHelper } from './';
import { Button } from 'react-bootstrap';
import { JsxElement } from 'typescript';


interface Props {
    addFormId: number,
    contentType: string,
    contentId: number,
    formSubmissions: FormSubmissionInterface[],
    formAddedFunction: (formId: number) => void
}

export const AssociatedForms: React.FC<Props> = (props) => {
    const [mode, setMode] = React.useState('display');
    const [editFormSubmissionId, setEditFormSubmissionId] = React.useState(0);
    
    const [allForms, setAllForms] = React.useState(null);
    const [unsubmittedForms, setUnsubmittedForms] = React.useState([]);

    const handleEdit = (formSubmissionId: number) => { setMode('edit'); setEditFormSubmissionId(formSubmissionId); }
    const handleUpdate = (formId: number) => { setMode('display'); props.formAddedFunction(0); }
    const handleAdd =  (e: React.MouseEvent) => {
        e.preventDefault();
        //setMode('display');
        var anchor = e.currentTarget as HTMLAnchorElement;
        console.log(anchor);
        const formId = parseInt(anchor.getAttribute("data-formid")); 
        console.warn(formId);
        props.formAddedFunction(formId);
    }

    const getCards = () => {
        var cards:JsxElement[] = [];
        getSubmittedCards(cards);
        getUnsubmittedCards(cards);
        return cards;
    }

    const getSubmittedCards = (cards: any[]) => {
        if (props.formSubmissions !== undefined) {
            for (var i = 0; i < props.formSubmissions.length; i++) {
                var fs = props.formSubmissions[i];
                cards.push(
                    <div key={fs.id} className="card">
                        <div className="card-header" id={"heading" + fs.id}>
                            <div>
                                <Button variant="link" data-toggle="collapse" data-target={"#collapse" + fs.id} aria-controls={"collapse" + fs.id}>{fs.form.name}</Button>
                            </div>
                        </div>
                        <div id={"collapse" + fs.id} className="collapse" aria-labelledby={"heading" + fs.id} data-parent="#formSubmissionsAccordion">
                            <div className="card-body"><FormSubmission formSubmissionId={fs.id} editFunction={handleEdit} /> </div>
                        </div>
                    </div>
                );
            }
        }
    }

    const getUnsubmittedCards = (cards: any[]) => {
        for (var i = 0; i < unsubmittedForms.length; i++) {
            var uf = unsubmittedForms[i];
            cards.push(
                <div key={uf.id} className="card">
                    <div className="card-header" id={"heading" + uf.id}>
                        <div className="addableForm">
                            <a className="float-right text-success" href="about:blank" data-formid={uf.id} onClick={handleAdd} ><i className="fas fa-plus" ></i></a>
                            <span>{uf.name}</span>
                        </div>
                    </div>
                </div>
            );
        }
    }




    const determineUnsubmitted = () => {
        var unsubmitted = [];
        if (allForms !== undefined && allForms !== null && props !== null) {
            var sf = props.formSubmissions;
            if (sf !== undefined && sf !== null) {
                for (var i = 0; i < allForms.length; i++) {
                    var exists = false;
                    for (var j = 0; j < sf.length; j++) if (sf[j].formId === allForms[i].id) exists = true;
                    if (!exists) unsubmitted.push(allForms[i]);
                }
            } else unsubmitted = allForms;
        }
        //setSelectedFormId((unsubmitted.length === 0) ? 0 : unsubmitted[0].id);
        setUnsubmittedForms(unsubmitted);
    }

    React.useEffect(() => { ApiHelper.apiGet('/forms?contentType=person').then(data => setAllForms(data)); }, []);
    React.useEffect(determineUnsubmitted, [allForms, props]);
    React.useEffect(() => {
        if (props.addFormId>0) setEditFormSubmissionId(0);
    }, [props.addFormId]);





    if (!UserHelper.checkAccess('Forms', 'View')) return <></>
    if (mode === 'edit' || props.addFormId > 0) return <FormSubmissionEdit formSubmissionId={editFormSubmissionId} updatedFunction={handleUpdate} addFormId={props.addFormId} contentType={props.contentType} contentId={props.contentId} />
    else return <div className="accordion" id="formSubmissionsAccordion">{getCards()}</div>;
}
