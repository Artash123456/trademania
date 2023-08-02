import {
  AffiliateGeneral,
  AffiliateOrdersAndEarnings,
  AffiliateReferrals,
} from 'components';
import AffiliateFilters from 'components/affiliate/AffiliateFilters';
import { useAppDispatch, useAppSelector } from 'context';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { changeFilters } from 'redux/reducers/affiliate';
import styled from 'styled-components';

const Affiliate = () => {
  const [isGeneral, setIsGeneral] = useState(true);
  const { affiliate_accepted } = useAppSelector(({ user }) => user.data);
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(changeFilters({ name: 'reset' }));
  }, [location.pathname, dispatch]);
  return (
    <div className="container">
      <h1>Affiliates</h1>
      <AffiliateGeneral />
      {affiliate_accepted && (
        <StyledTables>
          <div className="head flac">
            {isGeneral ? '  Orders and Earnings' : 'Referrals'}
            <AffiliateFilters isGeneral={isGeneral} />
            <div className="button-navigation">
              <span
                className={isGeneral ? 'active' : ''}
                onClick={() => setIsGeneral(true)}
              >
                General
              </span>
              <span
                className={!isGeneral ? 'active' : ''}
                onClick={() => setIsGeneral(false)}
              >
                Referrals
              </span>
            </div>
          </div>
          {isGeneral ? <AffiliateOrdersAndEarnings /> : <AffiliateReferrals />}
        </StyledTables>
      )}
    </div>
  );
};
const StyledTables = styled.div`
  background: ${({ theme }) => theme.body_color};
  padding: 1.6vmin;
  margin-bottom: 24px;
  @media (max-width: 1450px) {
    .head {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-row-gap: 8px;
      .button-navigation {
        grid-area: 1/2/2/3;
        width: fit-content;
        justify-self: flex-end;
      }
    }
  }
`;
export default Affiliate;
