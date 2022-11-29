import s from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ filterContacts, deleteContact }) => {
  return (
    <ul className={s.list}>
      {filterContacts.map(item => (
        <li className={s.item} key={item.id}>
          {item.name}:<span className={s.phoneNumber}>{item.number}</span>
          <button className={s.button} onClick={() => deleteContact(item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  filterContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
