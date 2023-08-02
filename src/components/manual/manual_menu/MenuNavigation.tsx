import { changeMenu } from 'redux/reducers/manual';
import styled from 'styled-components';
import { translation, useAppDispatch, useAppSelector } from 'context';

const MenuNavigation = () => {
  const dispatch = useAppDispatch();
  const { menu } = useAppSelector(({ manual }) => manual);
  return (
    <StyledNavigation>
      <span>Trade</span>
      <div className="button-navigation">
        {menu?.map((elem) => (
          <span
            key={elem.name}
            onClick={() => dispatch(changeMenu(elem.name))}
            className={elem.active ? 'active' : ''}
          >
            {translation(elem.name)}
          </span>
        ))}
      </div>
    </StyledNavigation>
  );
};
const StyledNavigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  > span {
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 25px;
    color: ${({ theme }) => theme.font_gray};
  }
  @media (max-width: 1250px) {
    width: 99%;
  }
`;
export default MenuNavigation;
