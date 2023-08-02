import { useEffect } from 'react';
import {
  generateLink,
  getAffiliateStatistics,
} from 'redux/actions/affiliate_actions';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from 'context';
import green2 from 'assets/images/pattern-card_green.svg';
import blue1 from 'assets/images/pattern-card_blue.svg';
import blue2 from 'assets/images/pattern-card-blue2.svg';
import { Styled } from 'components';
const AffiliateLink = () => {
  const dispatch = useAppDispatch();
  const { statistics, referrer_link } = useAppSelector(
    ({ affiliate }) => affiliate
  );
  useEffect(() => {
    dispatch(generateLink());
    dispatch(getAffiliateStatistics());
  }, [dispatch]);

  return (
    <StyledAffiliateLink>
      <Styled.Card
        head="Copy your link"
        data={`Anyone registered with this link, will bring you
          ${statistics?.refer_bonus_rate}% credits`}
        copy_text={referrer_link}
        white
        img={blue1}
      />
      <Styled.Card
        data="REFERRALS"
        head={statistics?.referrals_count}
        img={green2}
      />
      <Styled.Card
        data="TOTAL EARNINGS"
        head={Number(statistics?.total_earnings)}
        white
        img={blue2}
      />
    </StyledAffiliateLink>
  );
};

const StyledAffiliateLink = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 24px;
  @media (max-width: 769px) {
    grid-template-columns: auto;
    grid-row-gap: 8px;
    > div {
      min-height: 120px;
    }
  }
`;
export default AffiliateLink;
