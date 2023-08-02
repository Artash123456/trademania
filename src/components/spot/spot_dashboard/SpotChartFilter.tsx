import { useAppDispatch, useAppSelector } from 'context';
import { changeChartFilter } from 'redux/reducers/spot';
import styled from 'styled-components';

const SpotChartFilter = () => {
  const dispatch = useAppDispatch();
  const { chart_filter } = useAppSelector(({ spot }) => spot);
  return (
    <StyledFilter>
      {chart_filter.map((item) => (
        <div
          key={item.name}
          className={item.active ? 'active' : ''}
          onClick={() => dispatch(changeChartFilter(item.name))}
        >
          {item.name}
        </div>
      ))}
    </StyledFilter>
  );
};

const StyledFilter = styled.div`
  position: absolute;
  bottom: 60px;
  right: 20px;
  position: absolute;
  bottom: 50px;
  display: flex;

  font: normal normal 600 1rem/21px Manrope;
  padding: 0 5px;
  > div {
    padding: 0 3px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.dark_input};
    color: ${({ theme }) => theme.font_gray};
    &:first-child {
      border-radius: 12px 0 0 12px;
      padding: 0 8px;
    }
    &:last-child {
      border-radius: 0 12px 12px 0;
      padding: 0 8px;
    }
    &:not(:last-child) {
      border-right: 1px solid ${({ theme }) => theme.font_gray};
    }
  }

  .active {
    background: ${({ theme }) => theme.submit_button_background};
    color: #fff;
  }
`;

export default SpotChartFilter;
