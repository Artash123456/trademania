import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MyBots,
  Button,
  Modal,
  CreateBotMain,
  Warning,
  BotInfoModal,
  RevenueCard,
} from 'components';
import { fetchMyBots } from 'redux/actions/bot_actions';
import { openModal } from 'redux/actions/other_actions';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'context';
import { MarketTypes } from 'types';
import { Plus } from 'assets/icons';

const Bot = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { revenue, revenueData } = useAppSelector(({ bot }) => bot);
  const { my_bots, canAddBot, create_bot_trading, bot_info_modal } =
    useAppSelector(({ bot, markets, modal }) => ({
      my_bots: bot.my_bots,
      canAddBot: markets.markets.find(
        (item: MarketTypes) => item.has_credential
      ),
      create_bot_trading: modal.types.create_bot_trading,
      bot_info_modal: modal.types.bot_info_modal,
    }));
  useEffect(() => {
    dispatch(fetchMyBots());
  }, [dispatch]);

  const handleAddBot = () => {
    if (!canAddBot) {
      toast.warn(
        <Warning
          message="You didn't connect to any of marketplaces, to be able to create a bot you need to connect at least one marketplace"
          onConfirm={() => navigate('/settings/api-connections')}
          button_text="Add Now"
        />
      );
      return;
    } else {
      dispatch(openModal('create_bot_trading'));
    }
  };
  return (
    <div className="container">
      <h1>Bot Trading</h1>
      <StyledBot>
        <RevenueCard
          heading="Bot revenue"
          day_perc={revenueData?.daily?.percent}
          month_perc={revenueData?.monthly?.percent}
          year_perc={revenueData?.annual?.percent}
          day_price={revenueData?.daily?.sum}
          month_price={revenueData?.monthly?.sum}
          year_price={revenueData?.annual?.sum}
          no_trades={revenue.count}
          capital={revenue.sum}
        />
        <MyBots data={my_bots} />
        <Button.Add
          value="add"
          plus={<Plus />}
          onClick={handleAddBot}
          className="add"
        />
      </StyledBot>
      <Modal
        open={create_bot_trading}
        onClose={() => dispatch(openModal('create_bot_trading'))}
        with_close_icon="create_bot_trading"
      >
        <CreateBotMain />
      </Modal>
      <Modal
        open={bot_info_modal}
        onClose={() => dispatch(openModal('bot_info_modal'))}
        with_close_icon="bot_info_modal"
      >
        <BotInfoModal />
      </Modal>
    </div>
  );
};
const StyledBot = styled.div`
  display: grid;
  grid-gap: 32px;
  > button {
    width: 100%;
    height: 54px;
  }
`;
export default Bot;
