import propTypes from "prop-types";
import css from "./Filter.module.css";

export const Filter = ({ value, handleChange }) => (
  <div>
    <label className={css.filterLabel}>Find contacts by name: </label>
    <input
      className={css.filterName}
      type="text"
      placeholder="Enter filter"
      value={value}
      onChange={handleChange}
    />
  </div>
);

Filter.propTypes = {
  value: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};
