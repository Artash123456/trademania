import { FC, useMemo, Fragment } from 'react';
import styled from 'styled-components';
import { CopyModalStepValues } from 'types';
import { StepsModalSummaryContainer, Switch } from 'components';
import { getImage, useAppSelector } from 'context';

interface Props {
  values: CopyModalStepValues;
  setStep: Function;
}

const CopyFollowStep5: FC<Props> = ({ values, setStep }) => {
  const { markets } = useAppSelector(({ markets }) => markets);

  const exchanges = useMemo(() => {
    let arr = [];
    for (let item of markets) {
      for (let elem of Object.keys(values.market_pairs)) {
        if (+item.id === +elem) arr.push(item);
      }
    }
    return arr;
  }, [values.market_pairs, markets]);
  const my_markets = useMemo(() => {
    let arr = [];
    for (let item of markets) {
      for (let elem of values.my_markets) {
        if (+item.id === +elem) arr.push(item);
      }
    }
    return arr;
  }, [values.my_markets, markets]);

  return (
    <StyledContainer>
      {Object.keys(values).map((elem: string) => {
        const hasItem =
          elem === 'trade_type' ||
          elem === 'market_pairs' ||
          elem === 'initial_investment' ||
          elem === 'my_markets';

        const num =
          elem === 'trade_type'
            ? 1
            : elem === 'market_pairs'
            ? 2
            : elem === 'my_markets'
            ? 3
            : 4;
        return (
          <Fragment key={elem}>
            {hasItem && (
              <StepsModalSummaryContainer
                key={elem}
                heading={
                  elem === 'market_pairs'
                    ? 'Trader markets'
                    : elem === 'initial_investment'
                    ? 'Investment'
                    : elem.split('_').join(' ')
                }
                setStep={setStep}
                step={num}
              >
                {elem === 'market_pairs' ? (
                  <div className="trader-markets">
                    {exchanges.map((market, index) => {
                      return (
                        <div key={index}>
                          <img
                            src={import.meta.env.VITE_BASE_URL + market.logo}
                            alt="logo"
                            width="60px"
                          />
                          <div className="trader-pairs">
                            {values.market_pairs[market.id].map((item) => {
                              return (
                                <img
                                  src={getImage(item.base, true, true)}
                                  alt="pair"
                                  width="20px"
                                  height="20px"
                                />
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : elem === 'my_markets' ? (
                  <div className="my-markets">
                    {my_markets.map((market) => (
                      <img
                        src={import.meta.env.VITE_BASE_URL + market.logo}
                        alt="logo"
                        width="60px"
                      />
                    ))}
                  </div>
                ) : elem === 'trade_type' ? (
                  <div className="trade-type flac">
                    {(values.trade_type === 'leverage' ||
                      values.trade_type === 'leverage_spot') && (
                      <label className="flac">
                        <Switch
                          checked={
                            values.trade_type === 'leverage' ||
                            values.trade_type === 'leverage_spot'
                          }
                          onChange={() => {}}
                        />
                        <p>Leverage</p>
                      </label>
                    )}
                    {(values.trade_type === 'spot' ||
                      values.trade_type === 'leverage_spot') && (
                      <label className="flac">
                        <Switch
                          onChange={() => {}}
                          checked={
                            values.trade_type === 'spot' ||
                            values.trade_type === 'leverage_spot'
                          }
                        />
                        <p>Spot</p>
                      </label>
                    )}
                  </div>
                ) : elem === 'initial_investment' ? (
                  <div className="investment">
                    <div>
                      <p>Total investment</p>
                      <p>{values.initial_investment}</p>
                    </div>
                    <div>
                      <p>Per trade amount</p>
                      <p>{values.per_trade_amount}</p>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </StepsModalSummaryContainer>
            )}
          </Fragment>
        );
      })}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: grid;
  margin-bottom: 35px;
  > div:not(:last-child) {
    margin-bottom: 16px;
  }
  .trader-markets {
    display: flex;
    align-items: center;
    > div {
      position: relative;
      > img {
        width: 100%;
        height: 30px;
      }
      > .trader-pairs {
        padding: 8px;
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${({ theme }) => theme.background_color};
        display: none;
      }
      &:hover {
        .trader-pairs {
          display: block !important;
        }
      }

      > img:not(:last-child) {
        margin-right: 16px;
      }
    }
  }
  .my-markets {
    > img:not(:last-child) {
      margin-right: 16px;
    }
  }
  .trade-type {
    > label {
      width: 100%;
      > div {
        margin-right: 8px;
      }
      p {
        font-size: 1.6rem;
      }
    }
  }
  .investment {
    > div {
      display: flex;
      > p {
        margin: 5px 8px 5px 0;
        font-size: 1.6rem;
      }
    }
  }
`;

export default CopyFollowStep5;
