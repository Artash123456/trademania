import { FC, Fragment } from 'react';
import styled from 'styled-components';
import { BotsContainer } from 'components';
import { BotTypes, BotModalStepValues } from 'types';
import { useAppSelector } from 'context';

const CreateBotStep1: FC<{
  values: BotModalStepValues;
  setFieldValue: Function;
  setFieldTouched: Function;
}> = ({ values, setFieldValue, setFieldTouched }) => {
  const { bots } = useAppSelector(({ bot }) => bot);
  return (
    <StyledExchanges>
      {bots.map((elem: BotTypes) => (
        <Fragment key={elem.id}>
          <BotsContainer
            onClick={() => {
              setFieldTouched('bot');
              setFieldValue('bot', elem);
            }}
            elem={elem}
            className={values?.bot?.id === elem.id ? 'active-selected' : ''}
          />
        </Fragment>
      ))}
    </StyledExchanges>
  );
};
const StyledExchanges = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  min-height: 150px;
  @media (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    > div {
      min-width: 280px;
    }
  } ;
`;
export default CreateBotStep1;
