import { Fragment, useEffect } from 'react';
import { addItemsToDashboard } from 'redux/reducers/dashboard';
import {
  DashboardItems,
  Button,
  DashboardCategoriesMenu,
  Warning,
} from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import styled from 'styled-components';
import { openModal } from 'redux/actions/other_actions';
import { RiErrorWarningFill } from 'react-icons/ri';

const DashboardAddItems = () => {
  const dispatch = useAppDispatch();
  const { items_to_add, activeCategory, containers } = useAppSelector(
    ({ dashboard }) => dashboard
  );
  useEffect(() => {
    if (!items_to_add.length) dispatch(openModal('dashboard_items'));
  }, [dispatch, items_to_add.length]);
  if (!items_to_add?.length) return <></>;
  return (
    <StyledAddItems>
      <h2>Add widget</h2>
      <h3>{translation('set_16_paragraph')}</h3>
      <div className="error">
        <RiErrorWarningFill /> The widgets for Demo market, will be shown only
        while using the Demo data mode
      </div>

      <StyledGridContainer>
        <DashboardCategoriesMenu />
        <div className="menu">
          {items_to_add?.map((elem) => {
            let show = false;
            if (
              elem.category_id === activeCategory ||
              activeCategory === 'none'
            ) {
              show = true;
            }
            const has_pnl = containers.some((item) => item.type === 'small');
            return (
              <Fragment key={elem.id}>
                {show && (
                  <div className={`cont ${elem.type}`}>
                    <DashboardItems element={elem} addItem={true} />
                    <Button.Add
                      value="add"
                      addItems
                      plus="+"
                      onClick={() => {
                        if (!has_pnl && elem.head === 'totalIncome') return;
                        dispatch(addItemsToDashboard(elem));
                      }}
                    />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </StyledGridContainer>
    </StyledAddItems>
  );
};

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  grid-column-gap: 24px;
  > .menu {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-height: 600px;
    overflow: auto;
    .cont {
      position: relative;
      margin: 7px;
      width: -webkit-fill-available;
      > button {
        position: absolute;
        right: 5px;
        bottom: 5px;
      }
    }
    .long,
    .chart {
      grid-column: 1/4;
    }
    .chart {
      div {
        height: auto;
      }
    }
  }
  @media (max-width: 1700px) {
    h2 {
      margin: 0;
    }
    > .menu {
      display: flex;
      flex-wrap: wrap;
      max-height: 420px;
      overflow: auto;
    }
  }

  @media (max-width: 1200px) {
    grid-template-columns: 170px auto;
    grid-column-gap: 16px;
  }
  @media (max-width: 769px) {
    grid-template-columns: auto;
    grid-row-gap: 16px;
  }
`;

const StyledAddItems = styled.div`
  background: ${({ theme }) => theme.dark_input};
  max-width: 1600px;
  @media (max-width: 1700px) {
    padding: 16px !important;
  }
`;

export default DashboardAddItems;
