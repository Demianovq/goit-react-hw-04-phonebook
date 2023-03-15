import PropTypes from 'prop-types';

export const ContactList = ({ contacts, filteredContacts, onDelete }) => {
  const renderAMarkUpList = array => {
    return array.map(({ id, name, number }) => {
      return (
        <li key={id} contactid={id}>
          {name}: {number}
          <button type="button" onClick={() => onDelete(id)}>
            Delete
          </button>
        </li>
      );
    });
  };

  return (
    <ul>
      {filteredContacts
        ? renderAMarkUpList(filteredContacts)
        : renderAMarkUpList(contacts)}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
