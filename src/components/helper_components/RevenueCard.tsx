import { Row } from 'components';
import { FC } from 'react';
import styled from 'styled-components';
import green1 from 'assets/images/pattern-card-green.svg';
import green2 from 'assets/images/pattern-card_green.svg';
import blue1 from 'assets/images/pattern-card-blue.svg';
import blue2 from 'assets/images/pattern-card_blue.svg';
import { getImage } from 'context';

const images: { [key: string]: string } = {
  green1,
  blue1,
  green2,
  blue2,
};

interface Props {
  capital?: string | number;
  no_trades?: string | number;
  heading?: string;
  day_price?: string | number;
  month_price?: string | number;
  year_price?: string | number;
  day_perc?: string | number;
  month_perc?: string | number;
  year_perc?: string | number;
  img_num?: number;
}

const RevenueCard: FC<Props> = ({
  capital = '',
  no_trades = '',
  heading = '',
  day_price = '',
  month_price = '',
  year_price = '',
  day_perc = '',
  month_perc = '',
  year_perc = '',
  img_num = 1,
}) => {
  return (
    <StyledCard
      day_perc={day_perc}
      year_perc={month_perc}
      month_perc={month_perc}
      img_num={img_num}
    >
      <div>
        <span>
          <img
            src={getImage('usdt', true, false)}
            width="25px"
            height="25px"
            alt="usdt"
          />{' '}
          {capital}
        </span>
        <span>Capital</span>
      </div>
      <div>
        <span>{no_trades}</span>
        <span>Nº of trades</span>
      </div>
      <div>
        <span>{heading}</span>
        <Row type="day" price={day_price} percent={day_perc} />
        <Row type="month" price={month_price} percent={month_perc} />
        <Row type="year" price={year_price} percent={year_perc} />
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div<Props>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  width: 100%;
  > div {
    padding: 2.4vmin;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
  > div:nth-child(1),
  > div:nth-child(2) {
    min-height: 179px;
    background-size: cover;
    > span:first-child {
      font-weight: 700;
      font-size: 3.2rem;
      line-height: 44px;
    }
    > span:last-child {
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 25px;
      text-transform: uppercase;
    }
  }
  > div:nth-child(1) {
    background-image: url(${({ img_num }) => images[`green${img_num}`]});
    color: #343a40;
  }
  > div:nth-child(2) {
    background-image: url(${({ img_num }) => images[`blue${img_num}`]});
    color: #fff;
  }
  > div:nth-child(3) {
    background-color: ${({ theme }) => theme.background_color};
    > span {
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 25px;
      margin-bottom: 24px;
      color: ${({ theme }) => theme.light_gray};
      text-transform: uppercase;
    }
  }
  @media (max-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    > div:nth-child(1),
    > div:nth-child(2) {
      min-height: 120px;
    }
    > div:nth-child(3) {
      grid-area: 2/1/2/3;
      > span {
        margin-bottom: 8px;
      }
    }
  }
  @media (max-width: 500px) {
    grid-template-columns: auto;
    grid-gap: 16px;
    > div:nth-child(1),
    > div:nth-child(2) {
      min-height: 120px;
    }
    > div:nth-child(3) {
      grid-area: auto;
      > span {
        margin-bottom: 8px;
      }
    }
  }
`;
export default RevenueCard;
