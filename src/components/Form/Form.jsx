import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { StyledForm, Item, StyledButton } from 'components/Form/Form.styled';
import PropTypes from 'prop-types';

export const MyForm = ({ onSubmit, contacts, isContDubled }) => {
  const initialValues = { name: '', number: '' };
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const nameRegExp =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  const schema = yup.object().shape({
    name: yup.string().matches(nameRegExp, 'Name is not valid').required(),
    number: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .max(12)
      .required(),
  });
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    if (
      !isContDubled(contacts, values, 'name') &&
      !isContDubled(contacts, values, 'number')
    ) {
      resetForm();
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {({ handleReset }) => (
        <StyledForm>
          <label htmlFor="">
            Name
            <Item type="text" name="name" />
            <ErrorMessage name="name" />
          </label>
          <label htmlFor="">
            Number
            <Item type="tel" name="number" />
            <ErrorMessage name="number" />
          </label>
          <StyledButton type="submit">Add contact</StyledButton>
          <StyledButton type="button" onClick={e => handleReset()}>
            Clear form
          </StyledButton>
        </StyledForm>
      )}
    </Formik>
  );
};

MyForm.propTypes = {
  values: PropTypes.object,
  onSubmit: PropTypes.func,
  isContDubled: PropTypes.func,
};
