import { FC } from 'react';
import styled from 'styled-components';
import { PairsContainer } from 'components';
import { BotModalStepValues, PairTypes } from 'types';
import { useAppSelector } from 'context';

const CreateBotStep3: FC<{
  values: BotModalStepValues;
  setFieldValue: Function;
}> = ({ setFieldValue, values }) => {
  const { pairs } = useAppSelector(({ bot }) => bot);

  return (
    <StyledCont>
      {pairs.map((elem: PairTypes) => (
        <PairsContainer
          elem={elem}
          key={elem.id}
          onClick={() => setFieldValue('pair', elem)}
          className={elem.id === values.pair.id ? 'active-selected' : ''}
        />
      ))}
    </StyledCont>
  );
};

const StyledCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 19px 0 23px 0;
  grid-gap: 11px;
  min-height: 200px;
  max-height: 300px;
  overflow: auto;
  padding: 2px 7px 2px 2px;
`;

export default CreateBotStep3;
