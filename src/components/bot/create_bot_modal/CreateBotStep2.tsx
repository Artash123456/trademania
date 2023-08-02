import { FC, Fragment } from 'react';
import { ExchangesContainer } from 'components';
import styled from 'styled-components';
import { BotModalStepValues } from 'types';
import { useAppSelector } from 'context';

const CreateBotStep2: FC<{
  values: BotModalStepValues;
  setFieldValue: Function;
}> = ({ values, setFieldValue }) => {
  const markets = useAppSelector(({ markets }) =>
    markets.markets.filter((item) => item.has_credential)
  );
  return (
    <StyledContainer>
      {markets.map((elem, index: number) => {
        return (
          <Fragment key={index}>
            {elem.name && (
              <span
                className={
                  values.market && values.market.id === elem.id
                    ? 'active-selected'
                    : ''
                }
                onClick={() => setFieldValue('market', elem)}
              >
                <ExchangesContainer
                  elem={elem}
                  key={index}
                  width="132px"
                  bot={true}
                />
              </span>
            )}
          </Fragment>
        );
      })}
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
  margin: 19px 0 23px 0;
  > span {
    height: fit-content;
  }
`;
export default CreateBotStep2;
