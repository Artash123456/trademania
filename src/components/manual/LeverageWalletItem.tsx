import { Styled } from 'components';
import { getImage, useAppSelector } from 'context';
import { FC, useState, useMemo } from 'react';

import { IoMdArrowDropup } from 'react-icons/io';
import styled from 'styled-components';
import { WalletsItemType } from 'types';
interface Props {
  data: WalletsItemType[];
  elem: string;
}
const LeverageWalletItem: FC<Props> = ({ data, elem }) => {
  const { totalBalance } = useAppSelector(({ spot }) => spot);
  const [active, setActive] = useState(false);
  const free = data.reduce((a, b) => a + Number(b.free || 0), 0);
  const percent = useMemo(() => {
    const sum = data.reduce((a, b) => {
      let price = b.price || b.price === 0 ? Number(b.price) : 1;
      const s = price * Number(b.total);
      return +a + +s;
    }, 0);
    if (!totalBalance || !sum) return ' ';
    return Number((sum * 100) / Number(totalBalance))?.toFixed(3);
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
            {Number(free).toFixed(Number(free) > 10 ? 2 : 3)} {elem}
          </span>{' '}
          <br />
          <span className="price">≈{percent} %</span>
          <IoMdArrowDropup />
        </span>
      </Styled.WalletItem>
      <Styled.WalletDropDown active={active}>
        {data.map((elem, index) => {
          return (
            <div key={index} className="flacjsb">
              <div
                style={{
                  backgroundImage: `url(${
                    import.meta.env.VITE_BASE_URL + elem.icon
                  })`,
                }}
              >
                <span>
                  {((Number(elem.free) / free || 1) * 100)?.toFixed(4)}
                </span>
                <div>
                  <span
                    style={{ width: `${(Number(elem.free) / free) * 100}%` }}
                  />
                </div>
              </div>
              <span>{Number(elem.free || 0).toFixed(4)}</span>
            </div>
          );
        })}
      </Styled.WalletDropDown>
    </>
  );
};

export default LeverageWalletItem;
