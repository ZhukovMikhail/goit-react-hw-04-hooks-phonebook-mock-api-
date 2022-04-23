import styled from '@emotion/styled';

export const StyledContList = styled.ul`
  width: 300px;
  margin: 10px 10px;
`;
export const StyledItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  & div {
    display: flex;
    justify-content: space-between;
    width: 70%;
  }
`;
export const StyledButton = styled.button`
  display: block;
  width: 70px;
  /* margin-top: 10px; */
  background-color: #726885;
  border-radius: 6px;
  color: wheat;
  height: 100%;
`;
