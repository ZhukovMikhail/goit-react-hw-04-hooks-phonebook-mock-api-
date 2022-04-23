import { StyledLabel, StyledImput } from './Filter.styled';
import PropTypes from 'prop-types';
export const Filter = props => {
  const inputHandler = e => {
    const { value } = e.currentTarget;
    props.onFilter(value);
  };
  return (
    <StyledLabel htmlFor="">
      Find my contacts by name
      <StyledImput type="text" name="filter" onChange={inputHandler} />
    </StyledLabel>
  );
};
Filter.propTypes = {
  value: PropTypes.string,
};
