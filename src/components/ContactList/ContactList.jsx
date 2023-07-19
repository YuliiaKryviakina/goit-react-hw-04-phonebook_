import propTypes from "prop-types";
import css from "./ContactList.module.css";

export const ContactList = ({ contacts, onHandleDelete }) => (
  <div className={css.wraperContactList}>
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.contactListItem}>
          {name}: {number}{" "}
          <button
            type="button"
            className={css.contactListItemBtn}
            onClick={() => onHandleDelete(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.exact({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
};
