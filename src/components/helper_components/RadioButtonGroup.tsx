import { FC, ChangeEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  labelList: Array<{ label: string; value: string; name: string }>;
  checked?: string | boolean;
}

const RadioButtonGroup: FC<Props> = ({ onChange, labelList, checked }) => {
  return (
    <StyledButtonGroup>
      {labelList.map((elem) => {
        return (
          <label
            key={elem.value}
            className={elem.value === checked ? 'active-label' : ''}
          >
            {elem.label}
            <input
              type="radio"
              name={elem.name}
              value={elem.value}
              checked={checked === elem.value}
              onChange={onChange}
            />
          </label>
        );
      })}
    </StyledButtonGroup>
  );
};

const StyledButtonGroup = styled.div`
  border: 1px solid #cccccc;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 4px;
  overflow: hidden;

  > label {
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 30px;
    letter-spacing: 1.2px;
    color: ${({ theme }) => theme.font_gray} !important;
    height: 100%;
    width: 50%;
    text-align: center;
    cursor: pointer;
    border: none;
    background: ${({ theme }) => theme.background_color};
    &:first-child {
      border-right: 1px solid #656565;
    }
  }
  > label > input {
    display: none;
  }

  .active-label {
    background: ${({ theme }) => theme.submit_button_background};
    color: ${({ theme }) => theme.perc_background} !important;
  }
`;

export default RadioButtonGroup;
