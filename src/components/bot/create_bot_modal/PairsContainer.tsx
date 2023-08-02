import { getImage } from 'context';
import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { PairTypes } from 'types';
interface Props {
  elem: PairTypes;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
}
const PairsContainer: FC<Props> = ({ elem, onClick, className }) => {
  return (
    <StyledPairsContainer onClick={onClick} className={className}>
      <div>
        <div
          style={{
            backgroundImage: getImage(
              elem.base === 'XBt'
                ? elem.value.slice(0, elem.value.indexOf('USD'))
                : elem.base,
              false,
              true
            ),
          }}
        />

        <div
          style={{
            backgroundImage: getImage(elem.quote, false, true),
          }}
        />
      </div>
      <span>{elem.label}</span>
    </StyledPairsContainer>
  );
};

const StyledPairsContainer = styled.div`
  height: 92px;
  background: ${({ theme }) => theme.dark_input};
  min-width: 110px;
  display: grid;
  place-items: center;
  cursor: pointer;
  > div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
    > div {
      width: 40px;
      height: 40px;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  span {
    font-size: 1.4rem;
    letter-spacing: 0.8px;
    font-weight: 600;
    color: ${({ theme }) => theme.font_gray};
  }
`;
export default PairsContainer;
