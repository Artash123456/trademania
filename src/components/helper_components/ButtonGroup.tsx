import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Button } from 'components';
interface Props {
  onBack?: MouseEventHandler<HTMLButtonElement>;
  onFurther?: MouseEventHandler<HTMLButtonElement>;
  step?: number;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onSubmit?: () => void;
  text?: string;
  cancel_text?: string;
}
const ButtonGroup: FC<Props> = ({
  onBack,
  onFurther,
  step,
  disabled,
  type,
  onSubmit,
  text,
  cancel_text,
}) => {
  let btnText = step !== 5 ? 'next' : 'start';
  if (text) btnText = text;

  return (
    <StyledButtons disabled={disabled} className="btn-group">
      <Button.Add
        value={cancel_text || step === 1 ? 'cancel' : 'back'}
        onClick={onBack}
      />
      <Button.Add
        value={btnText}
        onClick={onFurther}
        onSubmit={onSubmit}
        disabled={disabled}
        type={type}
      />
    </StyledButtons>
  );
};

const StyledButtons = styled.div<{ disabled?: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 32px;
  margin-top: 40px;

  > button {
    width: 100%;
    height: 56px;
    &:first-child {
      background: transparent;
      margin-right: 20px;
      color: ${({ theme }) => theme.font_gray};
      border: 1px solid ${({ theme }) => theme.font_gray};
    }
    &:last-child {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
      background: #18d690;
      color: #fff;
      opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
    }
  }
  @media (max-width: 550px) {
    grid-column-gap: 15px;
  }
`;
export default ButtonGroup;
