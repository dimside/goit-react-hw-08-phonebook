import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const changeFilter = ({ target: { value } }) => {
    dispatch(setFilter(value));
  };

  return (
    <div className={css.filter}>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={filter}
        onChange={changeFilter}
        className={css.filter_input}
      />
    </div>
  );
};
