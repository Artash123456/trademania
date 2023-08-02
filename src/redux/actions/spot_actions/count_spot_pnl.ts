import { OverviewType, SpotListItemType } from 'types';
export const countSpot = (
  elem: SpotListItemType,
  spot_overview: OverviewType
) => {
  if (elem) {
    if (spot_overview?.length) {
      let realized = 0;
      for (let overview_item of spot_overview) {
        if (String(overview_item.market) === String(elem.market_id)) {
          const symbol = elem.symbol as keyof unknown;
          if (overview_item.trades[symbol]) {
            for (let trades_item of overview_item.trades[symbol]) {
              let unrealized =
                (parseFloat(elem.last_price) -
                  parseFloat(trades_item.fill_price)) *
                parseFloat(trades_item.amount);
              let formula =
                (parseFloat(trades_item.fill_price) *
                  +trades_item.amount *
                  0.1) /
                  100 +
                (parseFloat(elem.last_price) *
                  parseFloat(trades_item.amount) *
                  0.1) /
                  100;
              realized = unrealized - formula;
            }
          }
          return realized;
        }
      }
    }
  }
  return 0;
};
