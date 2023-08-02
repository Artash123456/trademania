import { getImage, useAppSelector } from 'context';
import { FC, useState, useMemo } from 'react';

import { IoMdArrowDropup } from 'react-icons/io';
import styled from 'styled-components';
import { WalletItemType } from 'types';
import { useNavigate } from 'react-router-dom';
import { Styled } from 'components';

interface Props {
  data: WalletItemType[];
  elem: string;
}
const SpotWalletItem: FC<Props> = ({ data, elem }) => {
  const navigate = useNavigate();
  const { totalBalance } = useAppSelector(({ spot }) => spot);
  const [active, setActive] = useState(false);
  const free = data.reduce((a, b) => a + Number(b.free), 0);
  const percent = useMemo(() => {
    const sum = data.reduce((a, b) => {
      let price = b.price || b.price === 0 ? +b.price : 1;
      const s = price * +b.total;
      return a + +s;
    }, 0);
    if (!totalBalance || !sum) return ' ';
    return Number((sum * 100) / totalBalance)?.toFixed(3);
  }, [data, totalBalance]);
  return (
    <>
      <Styled.WalletItem active={active} className="flacjsb">
        <div
          onClick={() => setActive(!active)}
          style={{
            backgroundImage: getImage(elem, false, true),
          }}
        >
          {elem}
        </div>

        <span className="percent" onClick={() => setActive(!active)}>
          <span className="price">
            {Number(free).toFixed(4)} {elem}
          </span>
          <br />
          <span className="price">≈{percent} %</span>
          <IoMdArrowDropup />
        </span>
      </Styled.WalletItem>
      <Styled.WalletDropDown active={active}>
        {data.map((item, index) => {
          return (
            <div key={index} className="flacjsb">
              <div
                style={{
                  backgroundImage: `url(${
                    import.meta.env.VITE_BASE_URL + item.icon
                  })`,
                }}
                onClick={() =>
                  navigate(
                    `/spot/marketplace?market=${item.market.toLowerCase()}`,
                    {
                      state: elem,
                    }
                  )
                }
              >
                <span>{((Number(item.free) / free) * 100)?.toFixed(4)}</span>
                <div>
                  <span
                    style={{ width: `${(Number(item.free) / free) * 100}%` }}
                  />
                </div>
              </div>
              <span>{Number(item.free).toFixed(4)}</span>
            </div>
          );
        })}
      </Styled.WalletDropDown>
    </>
  );
};

export default SpotWalletItem;
