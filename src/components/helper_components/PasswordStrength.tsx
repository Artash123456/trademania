import { FC } from 'react';
import styled from 'styled-components';

const checkPasswordStrength = (value: string) => {
  let strong = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
  );
  let medium = new RegExp(
    '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))'
  );
  let weak = new RegExp('[a-zA-Z][0-9]');
  if (strong.test(value)) return 4;
  if (medium.test(value)) return 3;
  if (weak.test(value)) return 2;
  if (value.length) return 1;
  return 0;
};

const PasswordStrength: FC<{ value: string }> = ({ value }) => {
  return (
    <StyledStrength str={checkPasswordStrength(value)}>
      <div className="b1"></div>
      <div className="b2"></div>
      <div className="b3"></div>
      <div className="b4"></div>
    </StyledStrength>
  );
};

const StyledStrength = styled.div<{ str: number }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 16px;
  margin-bottom: 32px;
  > div {
    height: 8px;
    background-color: ${({ theme }) => theme.dark_input};
  }
  .b1 {
    background-color: ${({ theme, str }) => {
      return str > 0 ? '#3968FC' : theme.dark_input;
    }};
  }
  .b2 {
    background-color: ${({ theme, str }) =>
      str > 1 ? '#3968FC' : theme.dark_input};
  }
  .b3 {
    background-color: ${({ theme, str }) =>
      str > 2 ? '#3968FC' : theme.dark_input};
  }
  .b4 {
    background-color: ${({ theme, str }) =>
      str > 3 ? '#3968FC' : theme.dark_input};
  }
`;
export default PasswordStrength;
