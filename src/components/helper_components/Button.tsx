import { FC, MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import { translation } from 'context';
import { ButtonLoading } from 'assets/icons';
interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'submit' | 'button';
  value?: string;
  style?: {};
  header?: boolean;
  addItems?: boolean;
  disabled?: boolean;
  title?: string;
  pending?: boolean;
  children?: ReactNode | string;
  onSubmit?: () => void;
  className?: string;
  button_type?: string;
  error?: boolean;
  width?: string;
  plus?: string | ReactNode;
  height?: string;
}
const Button: FC<Props> = ({
  onClick,
  type = 'button',
  value,
  style,
  header,
  addItems,
  disabled,
  title,
  pending,
  onSubmit,
  children,
  className,
  button_type,
  error,
  width,
  plus,
  height = '64px',
}) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      style={style}
      header={header}
      addItems={addItems}
      disabled={disabled || pending}
      title={title}
      pending={pending}
      onSubmit={onSubmit}
      className={className}
      onDoubleClick={() => {}}
      button_type={button_type}
      error={error}
      width={width}
      height={height}
    >
      {plus ? plus : ''}
      {translation(value)}
      {children ? children : ''}
      <ButtonLoading />
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  header?: boolean;
  addItems?: boolean;
  pending?: boolean;
  button_type?: string;
  error?: boolean;
  width?: string;
  height?: string;
}>`
  background: ${({ theme, button_type, error }) =>
    button_type === 'green'
      ? error
        ? 'transparent'
        : theme.submit_button_background
      : button_type === 'blue'
      ? '#3968fc'
      : theme.background_color};
  border: none;
  text-align: center;
  letter-spacing: 1.1px;
  color: ${({ theme, button_type, error }) =>
    button_type === 'green'
      ? error
        ? theme.error_red
        : theme.font_light_gray
      : button_type === 'blue'
      ? '#ffffff'
      : theme.light_gray};
  transition: all 0.2s;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.8rem;
  line-height: 25px;
  position: relative;
  padding: 4px 14px;
  text-align: center;
  border: 2px solid
    ${({ theme, error }) => (error ? theme.error_red : 'transparent')};
  cursor: ${({ disabled, pending }) =>
    pending ? 'progress' : disabled ? 'not-allowed' : 'pointer'};
  text-transform: capitalize;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  > svg {
    margin-right: 8px;
    > path {
      fill: currentColor;
    }
  }
  > .loading {
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -7px;
    fill: ${({ theme }) => theme.background_color};
    display: ${({ pending }) => (pending ? 'block' : 'none')};
  }
`;

const Blue = (props: Props) => <Button {...props} button_type="blue" />;
const Add = (props: Props) => <Button {...props} />;
const Green = (props: Props) => <Button {...props} button_type="green" />;
export { Blue, Add, Green };
