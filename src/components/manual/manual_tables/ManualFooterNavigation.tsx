import { Fragment, FC, useEffect } from 'react';
import { changeFooterActive } from 'redux/reducers/manual';
import styled from 'styled-components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { MarketAsProps } from 'types';

const ManualFooterNavigation: FC<MarketAsProps> = ({ market }) => {
  const { footer, activeFooter, orderCount } = useAppSelector(
    ({ manual }) => manual
  );
  const { pending } = useAppSelector(({ loading }) => loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(changeFooterActive(footer[0].name));
    };
  }, [footer, dispatch]);
  return (
    <StyledNav className="button-navigation">
      {footer.map((elem) => {
        let has_menu = true;
        if (market.slug === 'binance') {
          if (
            elem.name === 'conditional_orders' ||
            elem.name === 'closed_positions'
          ) {
            has_menu = false;
          }
        }
        if (market.slug === 'bitget' && elem.name === 'closed_positions') {
          has_menu = false;
        }
        if (market.slug === 'okx' && elem.name === 'closed_positions') {
          has_menu = false;
        }
        const count =
          orderCount.name === 'active_orders' ? orderCount.count || 0 : '';
        return (
          <Fragment key={elem.id}>
            {has_menu ? (
              <span
                className={activeFooter === elem.name ? 'active' : ''}
                onClick={() => {
                  if (!pending) dispatch(changeFooterActive(elem.name));
                }}
              >
                {translation(elem.name)}{' '}
                {elem.name === 'active_orders' ? `(${count})` : ''}
              </span>
            ) : (
              ''
            )}
          </Fragment>
        );
      })}
    </StyledNav>
  );
};

const StyledNav = styled.div`
  margin-left: auto;
  @media (max-width: 900px) {
    margin-left: 16px;
  }
`;

export default ManualFooterNavigation;
