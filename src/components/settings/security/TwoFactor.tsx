import { translation, useAppDispatch, useAppSelector } from 'context';
import { Button } from 'components';
import { openModal } from 'redux/actions/other_actions';
import { AiFillWarning } from 'react-icons/ai';
import { RiErrorWarningFill } from 'react-icons/ri';
import { MdGppGood } from 'react-icons/md';

const TwoFactor = () => {
  const dispatch = useAppDispatch();
  const { two_factor_confirmed, has_credential } = useAppSelector(
    ({ user, markets }) => ({
      two_factor_confirmed: user?.data?.two_factor_confirmed,
      has_credential: markets.markets.some(
        (item) => item.has_credential?.market_id
      ),
    })
  );
  return (
    <div className="settings">
      <h3>{translation('two_factor')}</h3>
      {!two_factor_confirmed && <h4>{translation('set_6_paragraph')}</h4>}
      <Button.Green
        value={two_factor_confirmed ? 'disable' : 'activate_two_factor'}
        error={two_factor_confirmed}
        width="100%"
        onClick={() => {
          if (!has_credential || !two_factor_confirmed)
            dispatch(openModal('confirm_password'));
        }}
      />
      {two_factor_confirmed ? (
        <div className="success">
          <MdGppGood />
          {translation('set_33_paragraph')}
        </div>
      ) : (
        <>
          <div className="error">
            <AiFillWarning />
            {translation('set_12_paragraph')}
          </div>
          <div className="warning">
            <RiErrorWarningFill /> {translation('set_8_paragraph')}
          </div>
        </>
      )}
    </div>
  );
};

export default TwoFactor;
