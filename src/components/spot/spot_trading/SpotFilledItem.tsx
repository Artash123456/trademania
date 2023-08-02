import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SocketPriceMarkets } from 'components';
import { getImage } from 'context';
import { IoMdArrowDropup } from 'react-icons/io';

interface Props {
  data: { market: { name: string; icon: string }; value: string }[];
  elem: string;
}

const SpotFilledItem: FC<Props> = ({ data = [], elem }) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <StyledItem active={active}>
        <div
          style={{
            backgroundImage: getImage(elem, false, true),
          }}
        >
          {elem}
        </div>
        {data?.length ? (
          <SocketPriceMarkets
            market={data[0]?.market.name}
            symbol={data[0]?.value}
          />
        ) : (
          <>
            <span>-</span>
            <span>-</span>
          </>
        )}
        <IoMdArrowDropup onClick={() => setActive(!active)} />
      </StyledItem>
      <StyledDropDown active={active}>
        {data?.map((item, index) => {
          return (
            <div key={index}>
              <div
                style={{
                  backgroundImage: `url(${
                    import.meta.env.VITE_BASE_URL + item.market.icon
                  })`,
                }}
                onClick={() => {
                  navigate(
                    `/spot/marketplace?market=${item.market.name.toLowerCase()}`,
                    {
                      state: elem,
                    }
                  );
                }}
              >
                <span>{item.market.name}</span>
              </div>
              <SocketPriceMarkets
                market={item.market.name}
                symbol={item.value}
              />
            </div>
          );
        })}
      </StyledDropDown>
    </>
  );
};
const StyledItem = styled.div<{ active?: boolean }>`
  display: grid;
  grid-template-columns: 27% 30% 37% 5%;
  min-height: 38px;
  padding: 22px 0;
  border-bottom: 1px solid ${({ theme }) => theme.light_gray};
  border-radius: 0;
  align-items: center;

  > div {
    cursor: pointer;
    background-size: 20px 20px;
    padding-left: 25px;
    background-position: left center;
    background-repeat: no-repeat;
    line-height: 2.5 !important;
  }
  .price,
  > div {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 22px;
    color: ${({ theme }) => theme.light_gray};
  }
  > svg {
    font-size: 2rem;
    color: ${({ theme }) => theme.light_gray};
    transform: rotate(${({ active }) => (active ? '0' : '180deg')});
    transition: all 0.2s;
    cursor: pointer;
  }
`;
const StyledDropDown = styled.div<{ active: boolean }>`
  width: ${({ active }) => (active ? '100%' : 0)};
  height: ${({ active }) => (active ? 'auto' : 0)};
  font-size: ${({ active }) => (active ? '1.2rem' : 0)};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: all 0.1s;
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
  padding: ${({ active }) => (active ? '5px' : 0)};
  > div {
    display: grid;
    grid-template-columns: 40% 40% auto;
    min-height: 38px;
    margin-bottom: 8px;
    .price,
    > div > span {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      color: ${({ theme }) => theme.light_gray};
    }
    div {
      background-size: 30px 30px;
      padding-left: 40px;
      background-repeat: no-repeat;
      background-position: left;
      cursor: pointer;
      width: fit-content;
      line-height: 3.5;
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
`;
export default SpotFilledItem;
