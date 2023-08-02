import { FC, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { fetchSpotPagePairs } from 'redux/actions/spot_actions';
import { BsFilterLeft, BsGridFill, BsStarHalf } from 'react-icons/bs';
import { SearchInput, SpotFilledTable } from 'components';
import { useAppDispatch, useAppSelector } from 'context';
import { CiSliderHorizontal } from 'react-icons/ci';

let isRequested = 800,
  currentPage = 0,
  top = 0;

const SpotFilled: FC<{ addItem?: boolean; removeItem?: boolean }> = ({
  addItem,
}) => {
  const scrollRef = useRef(null);
  const { pending } = useAppSelector(({ loading }) => loading);
  const [value, setValue] = useState('');
  const [favorites, setFavorites] = useState(false);
  const dispatch = useAppDispatch();
  const handleScroll = () => {
    if (!scrollRef || !scrollRef.current || pending || addItem) return;
    const { scrollTop } = scrollRef.current;
    if (scrollTop > top) {
      top = scrollTop;
    }
    if (isRequested < top + 800) {
      isRequested += 800;
      currentPage++;
      dispatch(fetchSpotPagePairs({ current_page: currentPage }));
    }
  };
  useEffect(() => {
    if (!addItem) dispatch(fetchSpotPagePairs({ favorites, keyword: value }));
  }, [dispatch, addItem, favorites, value]);
  return (
    <StyledFilled favorite={favorites}>
      <div className="head">
        Coins
        <div className="flacjsb">
          <BsStarHalf onClick={() => setFavorites((p) => !p)} />
          <CiSliderHorizontal />
          <BsFilterLeft />
          <BsGridFill />
        </div>
      </div>
      <SearchInput
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="body" onScroll={handleScroll} ref={scrollRef}>
        {!addItem && <SpotFilledTable searchValue={value} />}
      </div>
    </StyledFilled>
  );
};
const StyledFilled = styled.div<{ favorite: boolean }>`
  height: 100%;
  min-height: 130px;
  padding: 1.6vmin;
  .head > div {
    svg {
      font-size: 1.6rem;
      padding: 8px;
      cursor: pointer;
      background: ${({ theme }) => theme.font_white};
      color: ${({ theme }) => theme.font_gray};
      width: 40px;
      height: 40px;
      border-radius: 8px;
      &:not(:last-child) {
        margin-right: 10px;
      }
      &:first-child {
        color: ${({ favorite }) => (favorite ? 'gold' : '')};
      }
    }
  }
  .body {
    height: calc(100% - 115px);
    overflow: auto;
    padding: 5px;
  }
`;
export default SpotFilled;
