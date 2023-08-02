import styled from 'styled-components';
import { openModal } from 'redux/actions/other_actions';
import { setToEditable } from 'redux/reducers/dashboard';
import { translation, useAppDispatch, useAppSelector } from 'context';

const DashboardDropWidgetsHere = () => {
  const dispatch = useAppDispatch();
  const { items_to_add } = useAppSelector(({ dashboard }) => dashboard);
  const handleOpenModal = () => {
    if (items_to_add.length) {
      dispatch(openModal('dashboard_items'));
      dispatch(setToEditable(true));
    }
  };
  return (
    <StyledWidgets className="container">
      <div onClick={handleOpenModal}>
        <span>+</span>
        <br />
        {translation('drop_widgets')}
      </div>
      <div onClick={handleOpenModal}>
        <span>+</span>
        <br />
        {translation('drop_widgets')}
      </div>
      <div onClick={handleOpenModal}>
        <span>+</span>
        <br />
        {translation('drop_widgets')}
      </div>
    </StyledWidgets>
  );
};
const StyledWidgets = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    border: 3px dashed ${({ theme }) => theme.submit_button_background};
    width: 260px;
    height: 132px;
    text-align: center;
    font-size: 1.6rem;
    letter-spacing: 0.8px;
    color: ${({ theme }) => theme.submit_button_background};
    padding: 20px 55px;
    margin-right: 16px;
    margin-top: 12px;
    cursor: pointer;
    > span {
      font-size: 5.6rem;
      line-height: 18px;
      letter-spacing: 2.8px;
      color: ${({ theme }) => theme.submit_button_background};
    }
  }
`;
export default DashboardDropWidgetsHere;
