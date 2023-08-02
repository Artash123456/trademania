import { FC, useState } from 'react';
import styled from 'styled-components';
import { deleteBot, startPauseBot } from 'redux/actions/bot_actions';
import { openModal } from 'redux/actions/other_actions';
import { BotPositions, Modal, Table, Warning } from 'components';
import { toast } from 'react-toastify';
import {
  DateC,
  getImage,
  translation,
  useAppDispatch,
  useAppSelector,
} from 'context';
import { showBotInfo } from 'redux/reducers/bot';
import { FaPause, FaPlay, FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineOrderedList } from 'react-icons/ai';

const MyBots: FC<any> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [botOrders, setBotOrders] = useState({ active: [], filled: [] });
  const { language } = useAppSelector(({ translation }) => translation);
  const { pending } = useAppSelector(({ loading }) => loading);
  const { bot_positions } = useAppSelector(({ modal }) => modal.types);
  const { fetch_my_bots, start_pause_bot } = useAppSelector(
    ({ loading }) => loading
  );
  return (
    <>
      <StyledMyBots>
        <div className="head">{translation('my_bots')}</div>
        <Table
          progressPending={fetch_my_bots}
          columns={[
            {
              name: translation('name'),
              selector: (elem) => (
                <div
                  onClick={() => {
                    dispatch(openModal('bot_info_modal'));
                    dispatch(showBotInfo(elem));
                  }}
                  className="co"
                >
                  <span>
                    {elem
                      ? `${elem.bot['name_' + language.toLowerCase()]}`
                      : ''}
                  </span>
                  <span className="sb">{elem?.pair?.base}</span>
                </div>
              ),
            },
            {
              name: 'PNL',
              selector: (elem) => {
                const pnl =
                  elem.bot_id === 1
                    ? Number(elem?.position_data?.realised_pnl)
                    : Number(elem?.pnl?.total);
                return (
                  <span className={pnl < 0 ? 'pl' : 'min'}>
                    {pnl ? pnl.toFixed(2) : '--'}
                  </span>
                );
              },
            },
            {
              name: translation('today'),
              selector: (elem) => {
                const pnl_today = elem?.bot_id === 1 ? 0 : elem?.pnl?.daily;
                return (
                  <span className={pnl_today < 0 ? 'pl' : 'min'}>
                    {pnl_today ? pnl_today.toFixed(2) : '--'}
                  </span>
                );
              },
            },
            {
              name: translation('active_days'),
              selector: (elem) => DateC.CountDate(elem.created_at),
            },
            {
              name: translation('invested_capital'),
              selector: (elem) => (
                <span>
                  <img
                    src={getImage('usdt', true, false)}
                    width="15px"
                    height="15px"
                    alt="usdt"
                  />{' '}
                  {elem.bot_id === 1 ? elem.amount : elem?.investment}{' '}
                </span>
              ),
            },
            {
              name: '',
              selector: (elem) => (
                <>
                  {elem.bot_id === 2 ? (
                    <AiOutlineOrderedList
                      className="trash min"
                      onClick={() => {
                        setBotOrders({
                          active: elem.active_orders,
                          filled: elem.filled_orders,
                        });
                        dispatch(openModal('bot_positions'));
                      }}
                    />
                  ) : (
                    ''
                  )}
                  <FaRegTrashAlt
                    className="trash"
                    onClick={() => {
                      toast.warn(
                        <Warning
                          message={`Are you sure want to remove the ${
                            elem.bot.name_en
                          } Bot?
                        ${
                          elem.bot_id === 1
                            ? 'So far you have earned ' +
                              elem?.position_data?.difference +
                              ' USD investing only ' +
                              elem.amount +
                              ' USD.'
                            : ''
                        }`}
                          onConfirm={(confirm_value) => {
                            if (!pending)
                              dispatch(
                                deleteBot({
                                  id: elem.id,
                                  botType: elem.bot_id === 1 ? 'cash' : 'grid',
                                  cancel_all: confirm_value,
                                })
                              );
                          }}
                          show_checkbox
                          confirm_message={
                            elem.bot_id === 2
                              ? 'Also cancel all active orders'
                              : 'Also close open position'
                          }
                        />,
                        { closeOnClick: false }
                      );
                    }}
                  />
                  {+elem.status === 1 ? (
                    <FaPause
                      className="trash"
                      onClick={() => {
                        if (!start_pause_bot)
                          dispatch(
                            startPauseBot({
                              id: elem.id,
                              grid: elem.bot_id !== 1,
                            })
                          );
                      }}
                    />
                  ) : (
                    <FaPlay
                      className="trash min"
                      onClick={() => {
                        if (!start_pause_bot)
                          dispatch(
                            startPauseBot({
                              id: elem.id,
                              grid: elem.bot_id !== 1,
                            })
                          );
                      }}
                    />
                  )}
                </>
              ),
            },
          ]}
          rows={data}
        />
      </StyledMyBots>
      <Modal
        open={bot_positions}
        onClose={() => {
          dispatch(openModal('bot_positions'));
          setBotOrders({ filled: [], active: [] });
        }}
        with_close_icon="bot_positions"
      >
        <BotPositions data={botOrders} />
      </Modal>
    </>
  );
};

const StyledMyBots = styled.div`
  background-color: ${({ theme }) => theme.background_color};
  overflow: hidden;
  flex-basis: calc(100% - 15px - 25%);
  padding: 2.4vmin;
`;
export default MyBots;
