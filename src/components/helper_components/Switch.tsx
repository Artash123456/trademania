import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
  onChange?: MouseEventHandler<HTMLDivElement>;
  checked: boolean;
  width?: number;
  height?: number;
}

const Switch: FC<Props> = ({ onChange, checked, width = 37, height = 22 }) => {
  return (
    <StyledSwitch
      onClick={onChange}
      checked={checked}
      width={width}
      height={height}
      className="switch"
    >
      <div />
    </StyledSwitch>
  );
};
const StyledSwitch = styled.div<Props>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: ${({ theme, checked }) =>
    checked ? '#3968fc' : theme.light_gray};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  > div {
    background: ${({ theme }) => theme.background_color};
    width: ${({ height }) => `calc(${height}px - 7px)`};
    height: ${({ height }) => `calc(${height}px - 7px)`};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translate(
      ${({ width = 0, height = 0, checked }) =>
        checked ? width - height + 3 : 5}px,
      -50%
    );
    transition: transform 0.3s;
  }
`;
export default Switch;
