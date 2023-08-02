import { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TradingViewChart } from 'charts';
import { ManualState, MarketTypes, PairTypes } from 'types';
import { RecentTrades } from 'components';
import { store } from 'redux/reducers';
class ManualChart extends Component<{
  market: MarketTypes;
  symbol: PairTypes;
}> {
  constructor(props: { market: MarketTypes; symbol: PairTypes }) {
    super(props);
    this.state = {
      showRecentTrades: false,
    };
  }
  state = {
    showRecentTrades: false,
  };
  componentDidUpdate() {}
  getSnapshotBeforeUpdate(
    prevProps: Readonly<{ market: MarketTypes; symbol: PairTypes }>
  ) {
    if (prevProps.market.name !== this.props.market.name)
      this.setState({ showRecentTrades: false });
    return true;
  }
  render(): ReactNode {
    const { market, symbol } = this.props;
    const { showRecentTrades } = this.state;
    return (
      <StyledChart>
        <div className="head flacjsb">
          Chart ({market.name})
          <span
            onClick={() =>
              this.setState({ showRecentTrades: !showRecentTrades })
            }
          >
            {showRecentTrades ? 'Hide' : 'Show'} Recent Trades
          </span>
        </div>
        <TradingViewChart
          symbol={symbol?.chart}
          market={market.name !== 'demo' ? market.name : 'binance'}
        />
        {showRecentTrades && (
          <RecentTrades market={market.name} symbol={symbol?.value} />
        )}
      </StyledChart>
    );
  }
}
const mapStateToProps = ({ manual }: { manual: ManualState }) => {
  const { symbol } = manual;
  return { symbol };
};
export default connect(mapStateToProps)(ManualChart);

const StyledChart = styled.div`
  grid-area: chart;
  overflow: hidden;
  padding: 1.6vmin;
  position: relative;
  .head > span {
    text-decoration: underline;
    cursor: pointer;
    font-size: 1.6rem;
  }
  .recent-trades {
    position: absolute;
    background-color: ${({ theme }) => theme.background_color};
    top: 35px;
    right: 0;
  }
`;
