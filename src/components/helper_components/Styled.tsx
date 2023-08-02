import styled from 'styled-components';
import { copy, useAppSelector } from 'context';
import { BsLink45Deg } from 'react-icons/bs';
import { FC, MouseEventHandler, ReactNode } from 'react';
import { RiDatabaseFill } from 'react-icons/ri';

interface Props {
  head?: string | number | ReactNode;
  data?: string;
  img?: string;
  copy_text?: string;
  white?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Card: FC<Props> = ({ head, data, copy_text, img, white, onClick }) => {
  return (
    <StyledCard img={img} white={white} onClick={onClick}>
      <h2>{head}</h2>
      <p>{data}</p>
      {copy_text && <BsLink45Deg onClick={() => copy(copy_text)} />}
    </StyledCard>
  );
};
const StyledCard = styled.div<{ img?: string; white?: boolean }>`
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-repeat: no-repeat;
  padding: 2.4vmin;
  position: relative;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > h2,
  > p {
    color: ${({ white }) => (white ? '#fff' : '#343A40')};
  }
  h2,
  div {
    font-weight: 600;
    font-size: 3.2rem;
    line-height: 44px;
  }
  p {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    max-width: calc(100% - 42px);
  }
  > svg {
    position: absolute;
    right: 24px;
    bottom: 24px;
    font-size: 6rem;
    color: #fff;
    cursor: pointer;
    &:active {
      color: #18d690;
    }
  }
`;
interface NoData {
  icon?: ReactNode;
  message?: string;
  additional_no_data_info?: string;
}

const NoData: FC<NoData> = ({
  icon = <RiDatabaseFill />,
  message = 'There are no records to show',
  additional_no_data_info,
}) => {
  return (
    <StyledNoData>
      {icon}
      <span>
        {message} {additional_no_data_info ? additional_no_data_info : ''}
      </span>
    </StyledNoData>
  );
};
const StyledNoData = styled.div`
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.font_gray};
  padding: 16px;
  > span {
    font-size: 1.6rem;
  }
  > svg {
    font-size: 5rem;
    color: ${({ theme }) => theme.font_gray};
    margin-bottom: 16px;
  }
`;

const WalletItem = styled.div<{ active?: boolean }>`
  min-height: 38px;
  padding: 22px 0;
  border-bottom: 1px solid ${({ theme }) => theme.light_gray};
  border-radius: 0;
  > div {
    cursor: pointer;
    background-size: 20px 20px;
    padding-left: 25px;
    background-position: left center;
    background-repeat: no-repeat;
    line-height: 2.5 !important;
  }
  .percent {
    text-align: right;
    > svg {
      font-size: 20px;
      color: ${({ theme }) => theme.light_gray};
      transform: rotate(${({ active }) => (active ? '0' : '180deg')});
      transition: all 0.2s;
      cursor: pointer;
    }
  }
  .price,
  > div {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 22px;
    color: ${({ theme }) => theme.light_gray};
  }
`;
const WalletDropDown = styled.div<{ active: boolean }>`
  width: ${({ active }) => (active ? '100%' : 0)};
  height: ${({ active }) => (active ? 'auto' : 0)};
  font-size: ${({ active }) => (active ? '1.2rem' : 0)};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: all 0.3s;
  padding: ${({ active }) => (active ? '16px' : 0)};
  border-radius: 0;
  > div {
    min-height: 30px;
    span {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.light_gray};
      font-weight: 600;
      text-align: right;
    }

    div {
      background-size: 30px;
      padding-left: 40px;
      background-repeat: no-repeat;
      background-position-y: center;
      > div {
        background-color: #dbdbdb;
        width: 70%;
        height: 5px;
        position: relative;
        > span {
          background: #30d5c8;
          height: 100%;
          position: absolute;
          z-index: 1;
          left: 0;
        }
      }
    }
  }
  @media (max-width: 769px) {
    > div {
      grid-template-columns: 40% 30% auto;
    }
    width: 100%;
    padding: 5px 0;
  }
`;
const MarketLogo: FC<{ name: string }> = ({ name }) => {
  const { images } = useAppSelector(({ dashboard }) => dashboard);
  return <StyledMarketLogo image={images[name?.toLowerCase()]} />;
};
const StyledMarketLogo = styled.div<{ image?: string }>`
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-repeat: no-repeat;
  width: 25px;
  height: 25px;
  border-radius: 16px;
  float: left;
`;

export { Card, NoData, MarketLogo, WalletDropDown, WalletItem };
