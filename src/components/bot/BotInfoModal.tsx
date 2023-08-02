import styled from 'styled-components';
import CashFlowBotInfoModal from './CashFlowBotInfoModal';
import GridBotInfoModal from './GridBotInfoModal';
import { useAppSelector } from 'context';

const BotInfoModal = () => {
  const { botInfoModal } = useAppSelector(({ bot }) => bot);

  return (
    <StyledInfo>
      {botInfoModal.bot_id === 1 ? (
        <CashFlowBotInfoModal />
      ) : (
        <GridBotInfoModal />
      )}
    </StyledInfo>
  );
};
const StyledInfo = styled.div`
  width: 500px;
  background-color: ${({ theme }) => theme.background_color};
  text-align: left;
  padding: 2vmin 5vmin;
  position: relative;

  > div {
    box-shadow: 0px 1px 0 ${({ theme }) => theme.font_gray};
    border-radius: 0;
    height: 30px;
    display: grid;
    grid-template-columns: 50% auto;
    place-items: center flex-start;
    text-transform: capitalize;
    span {
      color: ${({ theme }) => theme.font_gray};
      font-size: 1.2rem;
    }
    > span:first-child {
      font-weight: 600;
      text-transform: capitalize;
    }
  }
  @media (max-width: 550px) {
    width: 300px;
    padding: 10px;
  }
`;
export default BotInfoModal;
