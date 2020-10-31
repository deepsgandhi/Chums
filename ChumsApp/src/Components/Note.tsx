import React from "react";
import { PersonHelper, ApiHelper, Helper, NoteInterface, InputBox } from "./";

interface Props {
  note: NoteInterface;
  handleDelete: Function;
}

export const Note: React.FC<Props> = (props) => {
  const [note, setNote] = React.useState(null);
  const [showEdit, setShowEdit] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNote({ ...note, contents: e.currentTarget.value });

  React.useEffect(() => setNote(props.note), [props.note]);

  if (note === null) return null;
  const photoUrl = PersonHelper.getPhotoUrl(note.person);
  var datePosted = new Date(note.dateAdded);
  datePosted.setTime(
    datePosted.getTime() - datePosted.getTimezoneOffset() * 60 * 1000
  );
  const displayDuration = Helper.getDisplayDuration(datePosted);

  const handleSave = () => {
    ApiHelper.apiPost("/notes", [note]).then(() => {
      setShowEdit(false);
    });
  };

  const handleCancel = () => {
    setShowEdit(false);
  };

  return (
    <div className="note">
      {showEdit ? (
        <InputBox
          id="notesBox"
          headerIcon="far fa-edit"
          headerText="Edit note"
          saveFunction={handleSave}
          deleteFunction={props.handleDelete(note.id)}
          cancelFunction={handleCancel}
          saveText="Save"
        >
          <div className="form-group">
            <textarea
              id="noteText"
              className="form-control"
              name="contents"
              onChange={handleChange}
              value={note.contents}
            />
          </div>
        </InputBox>
      ) : (
        <React.Fragment>
          <div className="postedBy">
            <div>
              <img src={photoUrl} alt="avatar" />
              {note.person.name.display} - {displayDuration} ago
            </div>
            <i
              className="fas fa-pencil-alt"
              onClick={() => setShowEdit(true)}
              style={{ color: "#03a9f4" }}
            ></i>
          </div>
          <p>{note.contents.replace("\n", "<br/>")}</p>
        </React.Fragment>
      )}
    </div>
  );
};
