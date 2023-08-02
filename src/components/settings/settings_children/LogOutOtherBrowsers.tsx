import styled from 'styled-components';
import { openModal } from 'redux/actions/other_actions';
import { deleteBrowserSessions } from 'redux/actions/settings_actions';
import { ButtonGroup } from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';

const LogOutOtherBrowsers = () => {
  const dispatch = useAppDispatch();
  const { log_out_browser_sessions } = useAppSelector(({ loading }) => loading);
  return (
    <StyledModal>
      <h1>{translation('attention')}</h1>
      <p>{translation('set_29_paragraph')}</p>
      <div>
        <ButtonGroup
          onBack={() => dispatch(openModal('log_out_from_other_browsers'))}
          onFurther={() => dispatch(deleteBrowserSessions())}
          text="confirm"
          disabled={log_out_browser_sessions}
        />
      </div>
    </StyledModal>
  );
};
const StyledModal = styled.div`
  width: 560px;
  background: ${({ theme }) => theme.background_color};
  padding: 15px;
  h1 {
    color: ${({ theme }) => theme.error_red};
  }
  p {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    width: auto;
  }
`;
export default LogOutOtherBrowsers;
