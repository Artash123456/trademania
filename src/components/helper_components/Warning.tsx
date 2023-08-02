import { ReactNode, useState } from 'react';
import styled from 'styled-components';
interface Props {
  message: string;
  onConfirm?: (value?: number) => void;
  children?: ReactNode | string;
  button_text?: string;
  confirm_message?: string;
  show_checkbox?: boolean;
}
const Warning = ({
  message,
  onConfirm,
  button_text = 'Confirm',
  confirm_message,
  show_checkbox,
}: Props) => {
  const [value, setValue] = useState(0);
  return (
    <StyledContainer>
      <span>{message}</span>
      {show_checkbox && (
        <label>
          <input
            type="checkbox"
            value={value}
            onChange={() => setValue((p) => 1 - p)}
          />
          {confirm_message}
        </label>
      )}
      {onConfirm && (
        <button onClick={() => onConfirm(value)}>{button_text}</button>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  min-width: 300px;
  display: grid;
  grid-row-gap: 20px;
  span {
    font-weight: 600;
    font-size: 1.2rem;
  }
  label {
    color: red;
    font-size: 1.5rem;
    input {
      margin-right: 1.2rem;
      height: 2rem;
      width: 2rem;
    }
  }
  > button {
    border: none;
    outline: none;
    background: ${({ theme }) => theme.submit_button_background};
    padding: 15px 30px;
    color: #fff;
    width: fit-content;
    font-weight: 700;
    letter-spacing: 0.6px;
    cursor: pointer;
  }
`;
export default Warning;
