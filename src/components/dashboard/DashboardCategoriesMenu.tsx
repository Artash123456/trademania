import { useAppDispatch, useAppSelector } from 'context';
import styled from 'styled-components';
import { selectCategories } from 'redux/reducers/dashboard';

const DashboardCategoriesMenu = () => {
  const dispatch = useAppDispatch();
  const { categories, items_to_add, activeCategory, language } = useAppSelector(
    ({ dashboard, translation }) => ({
      categories: dashboard.categories,
      items_to_add: dashboard.items_to_add,
      activeCategory: dashboard.activeCategory,
      language: translation.language,
    })
  );
  return (
    <StyledMenu>
      <StyledLi
        onClick={() => dispatch(selectCategories('none'))}
        active={activeCategory === 'none'}
      >
        All ({items_to_add?.length})
      </StyledLi>
      {categories?.map((item) => {
        const widgets = items_to_add.filter(
          (elem) => elem.category_id === item.id
        );
        return (
          <StyledLi
            active={item.id === activeCategory}
            key={item.id}
            onClick={() => dispatch(selectCategories(item.id))}
          >
            {item ? item['name_' + language.toLowerCase()] : ''} (
            {widgets?.length})
          </StyledLi>
        );
      })}
    </StyledMenu>
  );
};
const StyledMenu = styled.div`
  list-style: none;
  padding: 0;
  background-color: ${({ theme }) => theme.background_color};
  padding: 8px;
  display: grid;
  place-items: flex-start;
  height: fit-content;
  grid-row-gap: 8px;
  @media (max-width: 769px) {
    grid-template-columns: repeat(8, 1fr);
    overflow: auto;
  }
`;

const StyledLi = styled.div<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? '#3968FC' : '')};
  color: ${({ active, theme }) => (active ? '#fff' : theme.font_gray)};
  height: 54px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-transform: capitalize;
  width: 100%;
  padding: 1.6vmin;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 22px;
  white-space: nowrap;
  &:hover {
    color: ${({ active }) => (active ? '#fff' : '#30d5c8')};
  }
  @media (max-width: 1250px) {
    height: 30px;
  }
`;
export default DashboardCategoriesMenu;
