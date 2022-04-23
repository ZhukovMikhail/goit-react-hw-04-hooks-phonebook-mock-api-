import styled from '@emotion/styled';
import { Form, Field } from 'formik';
// import { Formik, Field, ErrorMessage } from 'formik';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  border: 1px solid wheat;
  border-radius: 6px;
  padding: 20px;
`;
export const Item = styled(Field)`
  display: flex;
  flex-direction: column;
  width: 250px;
  border-radius: 6px;
  background-color: wheat;
`;
export const StyledButton = styled.button`
  display: block;
  width: 100px;
  margin-top: 10px;
  background-color: #726885;
  border-radius: 6px;
  color: wheat;
`;
