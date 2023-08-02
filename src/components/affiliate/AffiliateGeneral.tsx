import styled from 'styled-components';
import { BecomeAffiliate, AffiliateLink } from 'components';
import { useAppSelector } from 'context';

const AffiliateGeneral = () => {
  const { affiliate_accepted } = useAppSelector(({ user }) => user.data);
  return (
    <StyledAffiliate>
      {affiliate_accepted ? <AffiliateLink /> : <BecomeAffiliate />}
    </StyledAffiliate>
  );
};
const StyledAffiliate = styled.div`
  min-height: 200px;
  margin-bottom: 24px;
  h2 {
    margin-top: 0;
  }
`;
export default AffiliateGeneral;
