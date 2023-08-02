import { FC } from 'react';
import { getImage, translation } from 'context';
import Avatar from 'react-avatar';
import { CgProfile } from 'react-icons/cg';
import { Rating } from 'react-simple-star-rating';
import styled from 'styled-components';

const CopyUserActivity: FC<Record<string, any>> = ({ data }) => {
  return (
    <StyledActivity>
      <div>
        <div className="img">
          {data.picture ? (
            <Avatar
              name={data.first_name}
              alt={data.first_name}
              value={data.first_name}
              round="50%"
              size="100%"
              className="avatar"
              src={import.meta.env.VITE_BASE_URL + '/' + data.picture}
            />
          ) : (
            <CgProfile />
          )}
        </div>
        <Rating fillColor="gold" ratingValue={data.rate} size={33} readonly />
      </div>
      <div className="grid">
        <ProfC num={data.total} text="Total" />
        <ProfC num={data.total} text="Today" />
        <div>
          <div className="flacjsb">
            <p>Followers</p>
            <p>{data.followers}</p>
          </div>
          <div className="flacjsb">
            <p>{translation('active_days')}</p>
            <p>{data.open_days}</p>
          </div>
        </div>
        <div>
          <span>
            <span className="flac">
              <img src={getImage('btc', true, false)} alt="" />{' '}
              <p> {data.follower_equity_btc || 0}</p>
            </span>
            <br />
            <span className="flac">
              <img src={getImage('usd', true, false)} alt="" />{' '}
              <p> {data.follower_equity_usd || 0}</p>
            </span>
          </span>
          <p>Equity</p>
        </div>
      </div>
    </StyledActivity>
  );
};

const StyledActivity = styled.div`
  background-color: ${({ theme }) => theme.dark_input};
  padding: 1.6vmin;
  display: flex;
  width: 700px;
  .grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 92px);
    grid-gap: 16px;
    grid-template-areas: 's1 s2 o o' 'l l o o';
    > div {
      background-color: ${({ theme }) => theme.background_color};
      width: 100%;
      padding: 1.6vmin;
      p {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 22px;
        color: ${({ theme }) => theme.font_gray};
        margin: 3px 0;
        align-self: end;
      }
    }
    > div:nth-child(1) {
      grid-area: s1;
    }
    > div:nth-child(2) {
      grid-area: s2;
    }
    > div:nth-child(3) {
      grid-area: l;
    }
    > div:nth-child(4) {
      grid-area: o;
      display: grid;

      img {
        margin-right: 16px;
        width: 24px;
        height: 24px;
      }
    }
  }
  .img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    overflow: hidden;
    display: grid;
    place-items: center;
    background-color: ${({ theme }) => theme.background_color};
    margin-right: 32px;
    margin-bottom: 12px;
    > div {
      width: 100%;
      height: 100%;
    }
    > svg {
      font-size: 6rem;
      color: ${({ theme }) => theme.font_gray};
    }
  }
  @media (max-width: 830px) {
    flex-direction: column;
    width: auto;
  }
  @media (max-width: 630px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 92px);
      grid-template-areas: 's1 s2' 'l l' 'o o' 'o o';
    }
  }
`;
const ProfC: FC<{ num?: number; text?: string }> = ({ num = 0, text }) => (
  <StyledP num={num}>
    <span>{num}</span>
    <p>{text}</p>
  </StyledP>
);

const StyledP = styled.div<{ num: number }>`
  padding: 1.6vmin; 8px 0;
  display: grid;
  &:not(:last-child) {
    margin-right: 16px;
  }
  > span:first-child {
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 25px;
    color: ${({ num }) => (num > 0 ? '#18D690' : '#FA5252')};
    text-align: center;
  }
`;
export default CopyUserActivity;
