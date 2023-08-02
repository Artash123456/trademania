import styled from 'styled-components';
import { CopyActiveOrders, CopyOpenPositions } from 'components';
import { useAppDispatch, useAppSelector } from 'context';
import { changePositionActiveHeader } from 'redux/reducers/copy';
import { Scroll } from 'assets/styles';
const CopyTables = () => {
  const dispatch = useAppDispatch();
  const { tableHead } = useAppSelector(({ copy }) => copy);
  const active = tableHead?.find((elem) =>
    elem.active ? elem.name : ''
  )?.name;
  const { copy_table_loading } = useAppSelector(({ loading }) => loading);

  return (
    <StyledContainer>
      <div className="head flacjsb">
        {active === 'open_positions'
          ? 'trader open positions'
          : 'trader active orders'}
        <div className="button-navigation">
          {tableHead.map((item) => (
            <span
              className={item.active ? 'active' : ''}
              onClick={() => {
                if (!copy_table_loading)
                  dispatch(changePositionActiveHeader(item.name));
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
      <Scroll height="250px">
        {active === 'open_positions' && <CopyOpenPositions />}
        {active === 'active_orders' && <CopyActiveOrders />}
      </Scroll>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: 10px 20px 20px;
  background-color: ${({ theme }) => theme.background_color};
  width: 950px;
  min-height: 300px;
`;
export default CopyTables;
