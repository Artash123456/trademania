import { FC, useEffect, useState } from 'react';
import { fetchSpotWidgets } from 'redux/actions/spot_actions';
import { openModal } from 'redux/actions/other_actions';
import {
  EditSpotWidgetsButton,
  TradingItems,
  Loading,
  Modal,
  SpotItemsToAddModal,
  DragDropProvider,
} from 'components';
import styled from 'styled-components';
import { RiCloseCircleFill } from 'react-icons/ri';
import {
  changeSpotLayout,
  setToEditable,
  removeItem,
  cancelChanges,
} from 'redux/reducers/spot';
import { useAppDispatch, useAppSelector } from 'context';
const SpotTrading: FC<{
  market: { id: number | string; icon?: string; name: string };
}> = ({ market }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { layouts, containers, editable } = useAppSelector(({ spot }) => spot);
  const { spot_items } = useAppSelector(({ modal }) => modal.types);

  useEffect(() => {
    dispatch(fetchSpotWidgets()).then(() => {
      setLoading(false);
      setTimeout(() => dispatch(cancelChanges()));
    });
    return () => {
      dispatch(setToEditable(false));
    };
  }, [dispatch]);
  if (loading) return <Loading height="calc(100vh - 150px)" />;
  return (
    <>
      <StyledTrading>
        <div className="head container">
          Marketplace
          <EditSpotWidgetsButton />
        </div>
        <DragDropProvider
          onLayoutChange={(layout, layouts) =>
            dispatch(changeSpotLayout({ layout, layouts }))
          }
          onError={() => dispatch(cancelChanges())}
          onReady={() => dispatch(cancelChanges())}
          isDraggable={editable}
          items={containers?.length}
          layouts={layouts}
          dataMap={containers}
          render={(elem) => (
            <>
              {editable && (
                <RiCloseCircleFill
                  onMouseDown={() => dispatch(removeItem(elem))}
                  className="remove"
                />
              )}
              {editable && <div className="cover" />}
              <TradingItems type={elem.type} market={market} />
            </>
          )}
        />
      </StyledTrading>
      <Modal
        open={spot_items}
        with_close_icon="spot_items"
        onClose={() => dispatch(openModal('spot_items'))}
      >
        <SpotItemsToAddModal />
      </Modal>
    </>
  );
};

const StyledTrading = styled.div`
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .react-grid-layout > div {
    background-color: ${({ theme }) => theme.background_color};
  }
`;

export default SpotTrading;
