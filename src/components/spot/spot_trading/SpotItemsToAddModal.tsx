import { useEffect } from 'react';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { Button, TradingItems } from 'components';
import styled from 'styled-components';
import { addWidget } from 'redux/reducers/spot';
import { openModal } from 'redux/actions/other_actions';

const SpotItemsToAddModal = () => {
  const dispatch = useAppDispatch();
  const { items_to_add } = useAppSelector(({ spot }) => spot);
  useEffect(() => {
    if (!items_to_add.length) dispatch(openModal('spot_items'));
  }, [dispatch, items_to_add.length]);
  if (!items_to_add.length) return <></>;
  return (
    <StyledContainer>
      <h2>Add widget</h2>
      <h3>{translation('set_16_paragraph')}</h3>
      <div>
        {items_to_add?.map((elem) => (
          <div className="cont" key={elem.id}>
            <TradingItems type={elem.type} addItem={true} />
            <Button.Add
              value="add"
              addItems
              plus="+"
              onClick={() => dispatch(addWidget(elem))}
            />
          </div>
        ))}
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.dark_input};

  > h2 {
    margin-top: 0;
  }
  > div:last-child {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-height: 600px;
    overflow: auto;
    .cont {
      padding: 1px;
      overflow: hidden;
      position: relative;
      margin: 7px;
      width: 350px;
      height: 200px;
      > div {
        background: ${({ theme }) => theme.background_color};
      }
      > button {
        position: absolute;
        right: 5px;
        bottom: 5px;
      }
    }
  }
  @media (max-width: 1600px) {
    > div:last-child {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 1200px) {
    > div:last-child {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 1000px) {
    > div:last-child {
      display: grid;
      grid-template-columns: auto;
    }
  }
  @media (max-width: 450px) {
    .cont {
      width: 300px;
    }
  }
`;

export default SpotItemsToAddModal;
