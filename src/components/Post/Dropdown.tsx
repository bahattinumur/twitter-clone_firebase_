import { FiEdit2 } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { useRef } from "react";

const Dropdown = ({ handleDelete, handleEdit }) => {
  const inputRef = useRef();

  return (
    <label className="popup">
      <input ref={inputRef} type="checkbox" />
      <div className="burger" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className="popup-window">
        <legend>Popups</legend>
        <ul>
          <li>
            <button
              onClick={() => {
                handleEdit();
                inputRef.current.checked = false;
              }}
            >
              <FiEdit2 />
              <span>Edit</span>
            </button>
          </li>
          <hr />
          <li>
            <button onClick={handleDelete}>
              <FaTrashAlt />
              <span>Delete</span>
            </button>
          </li>
        </ul>
      </nav>
    </label>
  );
};

export default Dropdown;
