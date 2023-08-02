import { Scroll } from 'assets/styles';
import GridBotOrders from 'components/helper_components/trading_tables/GridBotOrders';
import { useAppDispatch, useAppSelector } from 'context';
import { FC } from 'react';
import { changePositionActiveHeader } from 'redux/reducers/bot';
import styled from 'styled-components';

const BotPositions: FC<{ data: { active: any[]; filled: any[] } }> = ({
  data,
}) => {
  const dispatch = useAppDispatch();
  const { tableHead } = useAppSelector(({ bot }) => bot);
  const active = tableHead?.find((elem) =>
    elem.active ? elem.name : ''
  )?.name;
  return (
    <StyledContainer>
      <div className="head flacjsb">
        {active === 'open_positions'
          ? 'bot filled orders'
          : 'bot active orders'}
        <div className="button-navigation">
          {Array.isArray(tableHead)
            ? tableHead?.map((item) => (
                <span
                  key={item.text}
                  className={item.active ? 'active' : ''}
                  onClick={() => {
                    dispatch(changePositionActiveHeader(item.name));
                  }}
                >
                  {item.text}
                </span>
              ))
            : ''}
        </div>
      </div>
      <Scroll height="250px">
        {active === 'active_orders' && <GridBotOrders data={data?.active} />}
        {active === 'filled_orders' && <GridBotOrders data={data?.filled} />}
      </Scroll>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.background_color};
  max-width: 950px;
  min-height: 300px;
  .head {
    margin-top: 35px;
  }
  @media (max-width: 1150px) {
    max-width: auto;
  }
`;
export default BotPositions;
