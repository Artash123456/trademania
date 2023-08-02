import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { translation } from 'context';
import { BotTypes } from 'types';

interface Props {
  elem?: BotTypes | { id: null};
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

const BotsContainer: FC<Props> = ({ elem, onClick, className }) => {
  if(!elem || !elem.id) return <></>
  return (
    <StyledContainer onClick={onClick} className={className}>
      <div>
        <h4>{elem ? elem.name_en : ''}</h4>
        <p>{elem ? elem.description_en : ''}</p>
        <div className="hr" />
      </div>
      <div>
        <span>
          <span>{translation('price_scale')}</span>
          <span>{elem?.price_scale}</span>
        </span>
        <span>
          <span>{translation('safety_orders')}</span>
          <span>{elem?.safety_orders}</span>
        </span>
        <span>
          <span>Take Profit</span>
          <span>{elem?.take_profit_ratio}</span>
        </span>
        <span>
          <span>{translation('volume_scale')}</span>
          <span>{elem?.volumne_scale}</span>
        </span>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background: ${({ theme }) => theme.dark_input};
  padding: 1.6vmin;
  cursor: pointer;
  h4,
  p {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.font_gray};
    line-height: 21px;
    margin: 0;
  }
  h4 {
    font-weight: bold;
  }
  .hr {
    margin-top: 34px;
    margin-bottom: 5px;
  }
  > div:last-child {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0 20px;
    > span {
      display: grid;
      grid-template-columns: auto auto;
      > span {
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 19px;
      }
      > span:first-child {
        color: ${({ theme }) => theme.font_gray};
      }
      > span:last-child {
        color: #7596ff;
        text-align: right;
      }
    }
  }
  @media (max-width: 600px) {
    > div:last-child {
      grid-gap: 0 4px;
    }
    .bot > div:first-child {
      padding-right: 4px;
      margin-right: 4px;
    }
  }
`;
export default BotsContainer;
