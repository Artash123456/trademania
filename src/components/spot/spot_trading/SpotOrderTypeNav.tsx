import styled from 'styled-components';
import { handleSetActive } from 'redux/reducers/spot';
import { translation, useAppDispatch, useAppSelector } from 'context';

const SpotOrderTypeNav = () => {
  const dispatch = useAppDispatch();
  const { menu } = useAppSelector(({ spot }) => spot);
  return (
    <StyledNavigation>
      {menu.map((elem) => {
        return (
          <div
            key={elem.name}
            onClick={() =>
              dispatch(handleSetActive({ name: elem.name, type: 'menu' }))
            }
            className={elem.active ? 'active' : ''}
          >
            {translation(elem.name)}
          </div>
        );
      })}
    </StyledNavigation>
  );
};
const StyledNavigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  padding: 8px 0;
  > div {
    font-weight: 600;
    letter-spacing: 0.7px;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.font_gray};
    cursor: pointer;
    &:first-child {
      margin-right: 30px;
    }
  }
  .active {
    color: ${({ theme }) => theme.submit_button_background};
  }
`;
export default SpotOrderTypeNav;
