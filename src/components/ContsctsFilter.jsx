import PropTypes from 'prop-types';

import css from './PhoneBook.module.scss';

const ContactsFilter = ({ handleChange }) => (
  <div className={css.filterInputGroup}>
    <label
      className={css.labelFilter}
      htmlFor="filter"
    >
      Find contacts by name
    </label>
    <input
      className={css.input}
      id="filter"
      onChange={handleChange}
      type="text"
      name="filter"
    />
  </div>
);
export default ContactsFilter;

ContactsFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
