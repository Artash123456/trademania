import { Children, isValidElement, FC, ReactNode } from 'react';
import styled from 'styled-components';
import { MenuNavigation } from 'components';
import { useAppSelector } from 'context';
const ManualMenu: FC<{ children: ReactNode | string }> = ({ children }) => {
  const { pending } = useAppSelector(({ loading }) => loading);
  return (
    <StyledMenu pending={pending}>
      <div className="head">
        <MenuNavigation />
      </div>
      <div className="body">
        {Children.map(children, (child) => {
          if (isValidElement(child)) return child;
          return '';
        })}
      </div>
    </StyledMenu>
  );
};
const StyledMenu = styled.div<{ pending?: boolean }>`
  grid-area: menu;
  pointer-events: ${({ pending }) => (pending ? 'none' : 'all')};
  opacity: ${({ pending }) => (pending ? '0.3' : '1')};
  .body {
    overflow-y: auto;
    height: 700px;
  }
  > div,
  > form {
    padding: 15px 10px 20px 10px;
  }
  .react-select {
    margin-bottom: 15px;
  }
`;
export default ManualMenu;
