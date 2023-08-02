import { Button } from 'components';
import { becomeAffiliate } from 'redux/actions/affiliate_actions';
import { useAppSelector, useAppDispatch } from 'context';
import styled from 'styled-components';
import { BackgroundBanner } from 'assets/styles';

const BecomeAffiliate = () => {
  const dispatch = useAppDispatch();
  const { become_affiliate } = useAppSelector(({ loading }) => loading);
  return (
    <StyledBecome>
      <Banner>
        <h2>Become an Affiliate</h2>
      </Banner>
      <h3>
        Use your voice to inspire financial success by becoming a Trademania
        Affiliate.
      </h3>
      <Button.Green
        onClick={() => dispatch(becomeAffiliate())}
        value="become_affiliate"
        pending={become_affiliate}
      />
    </StyledBecome>
  );
};

const StyledBecome = styled.div`
  background-color: ${({ theme }) => theme.body_color};
  padding: 2.4vmin;
  > button {
    width: 100%;
    color: ${({ theme }) => theme.background_color};
  }
`;

const Banner = styled(BackgroundBanner)`
  > h2 {
    color: #fff;
    margin: 0;
  }
`;
export default BecomeAffiliate;
