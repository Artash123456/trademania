import { FC } from 'react';
import styled from 'styled-components';
interface Props {
  name?: string;
  onChange: (e: boolean) => void;
  label?: string;
  checked?: boolean | string;
  title?: string;
  showCheckbox?: boolean;
  error?: boolean | string;
}
const CheckboxInput: FC<Props> = ({
  name,
  onChange,
  label,
  checked,
  title,
  showCheckbox = true,
  error,
}) => {
  if (!showCheckbox) return <></>;
  return (
    <StyledLabel
      onChange={(e) => {
        const { value } = e.target as EventTarget & { value: boolean };
        onChange(value);
      }}
      checked={checked}
      error={error}
    >
      <input type="checkbox" name={name} />
      <span title={title}>{label}</span>
    </StyledLabel>
  );
};

const StyledLabel = styled.label<{
  checked?: boolean | string;
  error?: boolean | string;
}>`
  display: flex;
  align-items: center;
  position: relative;
  input{
    box-shadow: ${({error})=>error ? "inset 25px 25px #fa525280 !important" :""};
  }
  input:checked {
    accent-color: #3968fc;
  }
  > span {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    cursor: pointer;
    margin-left: 16px;
    color: ${({ theme, error }) => (error ? '#fa5252' : theme.light_gray)};
  }
  @media (max-width: 768px) {
    > span {
      font-size: 1.6rem;
    }
  }
`;

export default CheckboxInput;
