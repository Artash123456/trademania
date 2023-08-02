import { FC } from 'react';
import styled from 'styled-components';
import { BotModalStepValues, MarketTypes, PairTypes } from 'types';
import { BotsContainer, StepsModalSummaryContainer } from 'components';
import { getImage } from 'context';

const CreateBotStep5: FC<{ setStep: Function; values: BotModalStepValues }> = ({
  setStep,
  values,
}) => {
  return (
    <StyledContainer>
      {Object.keys(values).map((elem, index) => {
        return (
          <StepsModalSummaryContainer
            key={elem}
            heading={
              elem === 'pair'
                ? 'Coin/Currency'
                : elem === 'market'
                ? 'Exchange'
                : elem
            }
            setStep={setStep}
            step={index + 1}
          >
            {elem === 'market' ? (
              <StyledMarket market={values[elem]} />
            ) : elem === 'bot' ? (
              <BotsContainer elem={values[elem]} className="bot" />
            ) : elem === 'pair' ? (
              <StyledPair pair={values[elem]}>
                <div />
                <span />
                <div />
              </StyledPair>
            ) : elem === 'capital' ? (
              <div className="capital">
                {values[elem].capital || values[elem].investment}
              </div>
            ) : (
              ''
            )}
          </StepsModalSummaryContainer>
        );
      })}
      {values?.bot?.id === 2 ? (
        <StepsModalSummaryContainer
          key={'vazgen'}
          heading="Income Precent"
          setStep={setStep}
          step={4}
        >
          <div className="capital">{values?.capital?.income_percent}%</div>
        </StepsModalSummaryContainer>
      ) : (
        ''
      )}
    </StyledContainer>
  );
};

const StyledPair = styled.div<{ pair: PairTypes }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    height: 50px;
    border-right: 1px solid ${({ theme }) => theme.font_gray};
    margin-left: 30px;
    margin-right: 30px;
  }

  > div {
    width: 75px;
    height: 32px;
    position: relative;
    background-position: 0 0;
    background-size: 32px 32px;
    background-repeat: no-repeat;

    &::after {
      position: absolute;
      right: 0;
      color: ${({ theme }) => theme.font_gray};
      top: 50%;
      transform: translatey(-50%);
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 19px;
    }
  }

  > div:first-child {
    background-image: url(${({ pair }) => getImage(pair.base, true, false)});

    &::after {
      content: '${({ pair }) => pair.base}';
    }
  }

  > div:last-child {
    background-image: url(${({ pair }) => getImage(pair.quote, true, false)});

    &::after {
      content: '${({ pair }) => pair.quote}';
    }
  }

  @media (max-width: 600px) {
    span {
      margin-left: 5px;
      margin-right: 5px;
    }

    > div {
      width: 38px;
      background-size: 15px 15px;
      height: 15px;
    }
  }
`;
const StyledMarket = styled.div<{ market?: MarketTypes | null }>`
  background-image: url(${({ market }) =>
    import.meta.env.VITE_BASE_URL + `${market ? market.logo : ''}`});
  background-size: contain;
  background-repeat: no-repeat;
  width: 100px;
  height: 30px;
  border-radius: 0;
  background-position: right center;
`;

const StyledContainer = styled.div`
  display: grid;
  grid-gap: 24px;
  overflow: auto;

  .bot {
    padding: 0;
    margin-left: auto;

    > div:first-child {
      border-right: 1px solid ${({ theme }) => theme.font_gray};
      border-radius: 0;
      padding-right: 16px;
      margin-right: 16px;
    }

    .hr {
      display: none;
    }

    display: flex;
    max-width: 100% !important;
  }

  .capital {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 150%;
    color: ${({ theme }) => theme.font_gray};
  }
`;

export default CreateBotStep5;
