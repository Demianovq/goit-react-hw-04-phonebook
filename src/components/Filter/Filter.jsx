import PropTypes from 'prop-types';
export const Filter = ({ onFilter }) => {
  return (
    <>
      <label>
        Find contacts by name
        <input type="text" name="filter" onChange={e => onFilter(e)} />
      </label>
    </>
  );
};

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
