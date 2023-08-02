import { FC, useMemo, ReactNode, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Resize } from 'assets/icons';
import { Responsive, WidthProvider, Layouts, Layout } from 'react-grid-layout';
import { useAppSelector } from 'context';
import { DashboardElement } from 'types';
const ReactGridLayout = WidthProvider(Responsive);
interface Props {
  onLayoutChange: (layout: Layout[], layouts: Layouts) => {};
  items: number;
  isDraggable?: boolean;
  preventCollision?: boolean;
  rowHeight?: number;
  layouts: Layouts;
  breakpoints?: { [P: string]: number };
  cols?: { [P: string]: number };
  useCSSTransforms?: boolean;
  dataMap: Array<DashboardElement>;
  render: <T extends DashboardElement>(elem: T) => ReactNode;
  zoomed?: string;
  layout?: [];
  onReady?: () => void;
  onError?: () => void;
}
let rendered = false;
const DragDropProvider: FC<Props> = ({
  onLayoutChange = () => {},
  items,
  isDraggable,
  preventCollision = false,
  rowHeight = 330,
  layouts,
  breakpoints = { lg: 1700, sm: 1500, xs: 960, xxs: 760 },
  cols = { lg: 3, sm: 4, xs: 3, xxs: 1 },
  useCSSTransforms = false,
  dataMap = [],
  render,
  zoomed = false,
  layout = [],
  onReady,
  onError,
}) => {
  const { isDemo } = useAppSelector(({ markets }) => markets);
  const defaultProps = {
    isDraggable: isDraggable,
    isResizable: isDraggable,
    items,
    preventCollision,
    rowHeight,
    layouts,
    breakpoints,
    cols,
    useCSSTransforms,
    layout,
    onLayoutChange: (layout: Layout[], layouts: Layouts) =>
      onLayoutChange(layout, layouts),
  };
  useLayoutEffect(() => {
    if (onReady && !rendered) {
      rendered = true;
      onReady();
    }
    const error_message = (t: string) =>
      `Uncaught TypeError: Cannot assign to read only property '${t}' of object '#<Object>'`;
    window.onerror = (e) => {
      if ((e === error_message('y') || e === error_message('x')) && onError) {
        onError();
      }
    };
  }, []);
  const filteredDemos = useMemo(() => {
    if (isDemo)
      return dataMap.filter((item) => !item.market_id || item.market_id === 5);
    return dataMap.filter((item) => !item.market_id || item.market_id !== 5);
  }, [isDemo, dataMap]);

  return (
    <StyledContainer editable={isDraggable}>
      <ReactGridLayout {...defaultProps} margin={[16, 16]}>
        {filteredDemos.map((elem) => (
          <StyledDrag
            data-grid={elem.grid}
            key={elem.id}
            className={`${elem.type} ${
              elem.id === zoomed ? 'zoomed' : ''
            } cont`}
            id={elem.id.toString()}
            anim={isDraggable && !(elem.id === zoomed) && 'drag-anime'}
            isStatic={elem.static || elem.id === zoomed}
          >
            {render(elem)}
            {isDraggable && !elem.static && (
              <Resize
                className="react-resizable-handle"
                style={{ display: elem?.grid?.isResizable ? 'block' : 'none' }}
              />
            )}
          </StyledDrag>
        ))}
      </ReactGridLayout>
    </StyledContainer>
  ) as JSX.Element;
};

const StyledContainer = styled.div<{ editable?: boolean }>`
  .react-grid-layout {
    position: relative;
    .remove {
      color: ${({ theme }) => theme.error_red};
      font-size: 3rem;
      position: absolute;
      top: -15px;
      right: -15px;
      cursor: pointer;
      z-index: 6;
    }
  }
  .react-grid-item {
    transition: all 200ms ease;
    transition-property: left, top;
  }

  .react-grid-item.cssTransforms {
    transition-property: transform;
  }
  .react-grid-item.resizing {
    z-index: 1;
    will-change: width, height;
  }
  .react-resizable-handle {
    width: 25px;
    height: 25px;
    position: absolute;
    cursor: se-resize;
    fill: ${({ theme }) => theme.font_gray};
    width: 25px;
    height: 25px;
    bottom: -5px;
    right: 0px;
    display: ${({ editable }) => (editable ? 'block' : 'none')};
  }

  .react-grid-item.react-draggable-dragging {
    transition: none;
    z-index: 3;
    will-change: transform;
    > div > div,
    .head {
      filter: blur(10px);
      background: #30d5c898;
    }
    svg {
      display: none;
    }
  }
  .react-grid-item.react-grid-placeholder {
    background: #30d5c898;
    box-shadow: ${({ theme }) => theme.box_shadow};
    border: 3px dashed #30d5c8;

    opacity: 0.6;
    display: grid;
    place-items: center;
    text-align: center;
    transition-duration: 100ms;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .react-grid-item.react-grid-placeholder::before {
    width: 120px;
    font-size: 1.6rem;
    line-height: 2.1rem;
    font-weight: bold;
    letter-spacing: 0.8px;
    color: #ffffff;
  }
`;
const StyledDrag = styled.div<{
  anim?: false | 'drag-anime';
  isStatic?: boolean;
}>`
  animation-name: ${({ anim }) => anim};
  > div {
    pointer-events: ${({ anim }) => (anim ? 'none' : 'all')};
  }
  &:hover {
    animation-name: '';
  }
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  @media (max-width: 1050px) {
    animation: none;
  }
`;
export default DragDropProvider;
