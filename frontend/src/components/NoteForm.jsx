import { React, useState } from "react";
import { useDispatch} from "react-redux";
import { createNote } from "../features/notes/noteSlice";

const NoteForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createNote({ text }));
    setText("");
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Note</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn" type="submit">
            +
          </button>
        </div>
      </form>
    </section>
  );
};

export default NoteForm;
