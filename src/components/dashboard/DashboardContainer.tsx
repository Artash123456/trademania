import {
  DashboardItems,
  DashboardDropWidgetsHere,
  DragDropProvider,
  Loading,
} from 'components';
import {
  cancelChanges,
  dragAndDrop,
  removeItem,
} from 'redux/reducers/dashboard';
import { RiCloseCircleFill } from 'react-icons/ri';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from 'context';

const DashboardContainer = () => {
  const dispatch = useAppDispatch();
  const { containers, editable, zoomed, layouts } = useAppSelector(
    ({ dashboard }) => dashboard
  );
  const { get_dashboard_widgets } = useAppSelector(({ loading }) => loading);
  if (get_dashboard_widgets) return <Loading />;
  if (!containers?.length) return <DashboardDropWidgetsHere />;
  return (
    <StyledContainer editable={editable}>
      <DragDropProvider
        layouts={layouts}
        onLayoutChange={(layout, layouts) =>
          dispatch(dragAndDrop({ layout, layouts }))
        }
        isDraggable={Boolean(editable)}
        items={containers.length}
        dataMap={containers}
        zoomed={zoomed}
        render={(elem) => (
          <>
            {editable && (
              <RiCloseCircleFill
                onMouseDown={() => dispatch(removeItem(elem))}
                className="remove"
              />
            )}
            <DashboardItems element={elem} zoomed={zoomed} />
          </>
        )}
        onReady={() => dispatch(cancelChanges())}
        onError={() => dispatch(cancelChanges())}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ editable: string }>`
  height: calc(100% - 120px);
  .zoomed {
    z-index: 7;
    box-shadow: 0 -200px 0 2000px #a9a9a9b5 !important;
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    background: ${({ theme }) => theme.perc_background};
    max-width: 80% !important;
    max-height: 70% !important;
    min-height: 120px;
    .head {
      height: 45px;
      padding-top: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
      .descript {
        font-size: 2rem;
      }
    }
  }
  .zoomed.long {
    width: 80% !important;
    height: 400px !important;
    .it {
      max-height: 40px !important;
      .h {
        height: 30px;
        font-size: 1.6rem;
      }
    }
  }
  .zoomed.small,
  .zoomed.single_ticker {
    height: 200px !important;
    width: 500px !important;
    .head {
      height: 45px;
      padding-top: 10px;
      svg {
        width: 30px;
        height: 30px;
      }
      .descript {
        font-size: 2rem;
      }
    }
  }
  .zoomed.chart,
  .zoomed.technical_analysis,
  .zoomed.forex_heat_map,
  .zoomed.economic_calendar,
  .zoomed.cryptocurrency_market {
    width: 80% !important;
    height: 70% !important;
  }
`;

export default DashboardContainer;
