import { FC, useEffect } from 'react';
import styled from 'styled-components';
import {
  ManualFooterNavigation,
  ManualFooterTable,
  Modal,
  StopLossTakeProfitModal,
  LimitMarketModal,
} from 'components';
import { refreshTable } from 'redux/reducers/manual';
import { openModal } from 'redux/actions/other_actions';
import { RiRefreshLine } from 'react-icons/ri';
import { fetchActiveOrders } from 'redux/actions/trading_actions';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { MarketAsProps } from 'types';
const ManualFooter: FC<MarketAsProps> = ({ market }) => {
  const dispatch = useAppDispatch();
  const {
    take_profit_stop_loss,
    manual_limit_market,
    pending,
    symbol,
    activeFooter,
  } = useAppSelector(({ modal, loading, manual }) => ({
    take_profit_stop_loss: modal.types.take_profit_stop_loss,
    manual_limit_market: modal.types.manual_limit_market,
    pending: loading.pending,
    symbol: manual.symbol,
    activeFooter: manual.activeFooter,
  }));
  useEffect(() => {
    if (market.id && symbol.value) {
      dispatch(
        fetchActiveOrders({
          market: market.id,
          is_spot: false,
        })
      );
    }
  }, [dispatch, market.id, symbol.value]);
  return (
    <>
      <StyledFooter>
        <div className="head">
          {translation(activeFooter)}
          <ManualFooterNavigation market={market} />
          <div className="refresh">
            <RiRefreshLine
              onClick={() => {
                if (!pending) dispatch(refreshTable());
              }}
            />
          </div>
        </div>

        <ManualFooterTable market={market} />
      </StyledFooter>
      <Modal
        open={take_profit_stop_loss}
        onClose={() => dispatch(openModal('take_profit_stop_loss'))}
        with_close_icon="take_profit_stop_loss"
      >
        <StopLossTakeProfitModal market={market} />
      </Modal>
      <Modal
        open={manual_limit_market}
        onClose={() => dispatch(openModal('manual_limit_market'))}
        with_close_icon="manual_limit_market"
      >
        <LimitMarketModal market={market} />
      </Modal>
    </>
  );
};

const StyledFooter = styled.div`
  grid-area: footer;
  .head {
    padding: 1.6vmin;
    display: flex;
    align-items: center;
    margin: 0;
    .refresh {
      background-color: ${({ theme }) => theme.dark_input};
      display: grid;
      place-items: center;
      margin-left: 16px;
      min-width: 31px;
      height: 31px;
      > svg {
        font-size: 18px;
        cursor: pointer;
        color: ${({ theme }) => theme.font_gray};
      }
    }
  }
  @media (max-width: 900px) {
    .head {
      display: grid;
      grid-template-rows: 25px auto 31px;
      grid-row-gap: 15px;
      > div {
        margin: 0;
      }
      .refresh {
        grid-area: 1/2;
      }
      .button-navigation {
        grid-area: 2/1/2/5;
      }
    }
  }
`;
export default ManualFooter;
