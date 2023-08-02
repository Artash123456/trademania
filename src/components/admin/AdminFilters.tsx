import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { SearchInput, CustomDatePicker, Select } from 'components';
import { useLocation } from 'react-router-dom';
import { openModal } from 'redux/actions/other_actions';
import { RiFilterOffLine, RiUserAddLine } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import { changeFilters, createRequestBody } from 'redux/reducers/admin';
import { fetchUsersAffiliates } from 'redux/actions/admin_actions';
import { useAppDispatch, useAppSelector } from 'context';

const AdminFilters = () => {
  const { markets } = useAppSelector(({ markets }) => markets);
  const [searchUsers, setSearchUsers] = useState('');
  const { role } = useAppSelector(({ user }) => user?.data);
  const {
    range,
    search,
    date,
    users_drop_down,
    market,
    user,
    source,
    is_affiliate,
    status,
    bot_type,
  } = useAppSelector(({ admin }) => admin.filters);
  const { pending } = useAppSelector(({ loading }) => loading);
  const { affiliate_users_drop_down } = useAppSelector(({ admin }) => admin);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const marketsOptions = useMemo(() => {
    if (!markets.length) return [];
    return markets.map((item) => ({
      label: item.name.toUpperCase(),
      value: `${item.id}`,
    }));
  }, [markets]);
  useEffect(() => {
    dispatch(changeFilters({ name: 'reset' }));
  }, [location.pathname, dispatch]);
  useEffect(() => {
    if (searchUsers)
      dispatch(fetchUsersAffiliates({ page: 1, search_query: searchUsers }));
  }, [searchUsers, dispatch]);

  if (
    location.pathname === '/admin/markets' ||
    location.pathname === '/admin/settings'
  )
    return <></>;
  if (
    location.pathname === '/admin/dashboard' ||
    location.pathname === '/admin/reports'
  )
    return (
      <StyledFilters>
        <Select
          className="react-select"
          classNamePrefix="react-select"
          options={[
            { label: 'Today', value: 'daily' },
            { label: 'This Week', value: 'weekly' },
            { label: 'This Month', value: 'monthly' },
            { label: 'This Year', value: 'yearly' },
            { label: 'All Time', value: 'all_time' },
          ]}
          value={range}
          onChange={(value) => {
            dispatch(changeFilters({ name: 'range', value: value }));
            dispatch(createRequestBody(location.pathname.split('/').at(-1)));
          }}
          placeholder="Select Range..."
        />
      </StyledFilters>
    );
  return (
    <StyledFilters>
      {location.pathname === '/admin/users' && role === 'super-admin' && (
        <div
          className="add-user"
          onClick={() => dispatch(openModal('admin_create_user'))}
        >
          <RiUserAddLine />
        </div>
      )}

      {location.pathname !== '/admin/reports' && (
        <SearchInput
          onChange={(e) =>
            dispatch(changeFilters({ name: 'search', value: e.target.value }))
          }
          placeholder="Search..."
          value={search}
        />
      )}

      {location.pathname !== '/admin/user-balances' && (
        <CustomDatePicker
          onChange={(value) =>
            dispatch(
              changeFilters({
                name: 'date',
                value: [value[0], value[1]],
              })
            )
          }
          values={[
            date[0] ? new Date(date[0]) : null,
            date[1] ? new Date(date[1]) : null,
          ]}
          isClearable
        />
      )}
      {location.pathname === '/admin/users' && (
        <Select
          className="react-select"
          classNamePrefix="react-select"
          placeholder="Select Status..."
          onChange={(value) => {
            if (value) {
              dispatch(changeFilters({ name: 'status', value: value }));
            }
          }}
          options={[
            { label: 'Active', value: 'active' },
            { label: 'Deleted', value: 'deleted' },
          ]}
          value={status.value ? status : null}
          maxMenuHeight={300}
        />
      )}
      {location.pathname === '/admin/bots' && (
        <Select
          className="react-select"
          classNamePrefix="react-select"
          onChange={(value) => {
            if (value) {
              dispatch(changeFilters({ name: 'bot_type', value: value }));
            }
          }}
          options={[
            { label: 'Cash Flow', value: 'cash_flow' },
            { label: 'Grid', value: 'grid' },
          ]}
          value={bot_type.value ? bot_type : null}
          maxMenuHeight={300}
          placeholder="Select Bot Type..."
        />
      )}
      {location.pathname === '/admin/orders' && (
        <Select
          className="react-select"
          classNamePrefix="react-select"
          onChange={(value) => {
            if (value) {
              dispatch(changeFilters({ name: 'source', value: value }));
            }
          }}
          options={[
            { label: 'Direct', value: 0 },
            { label: 'Copy', value: 1 },
            { label: 'Bot', value: 2 },
            { label: 'Subaccount', value: 3 },
          ]}
          maxMenuHeight={300}
          placeholder="Select Source..."
          value={source.value ? source : null}
        />
      )}

      {location.pathname !== '/admin/users' &&
        location.pathname !== '/admin/affiliate' &&
        location.pathname !== '/admin/user-balances' &&
        location.pathname !== '/admin/reports' && (
          <Select
            className="react-select"
            classNamePrefix="react-select"
            options={marketsOptions}
            value={market.value ? market : null}
            onChange={(value) => {
              if (value) {
                dispatch(changeFilters({ name: 'market', value: value }));
              }
            }}
            placeholder="Select Market..."
          />
        )}
      {location.pathname === '/admin/orders' && (
        <Select
          className="react-select"
          classNamePrefix="react-select"
          onInputChange={(value) => setSearchUsers(value)}
          options={[
            ...affiliate_users_drop_down.data,
            {
              label:
                affiliate_users_drop_down.last_page === users_drop_down
                  ? 'No more Data'
                  : 'Pending...',
              isDisabled: true,
            },
          ]}
          onMenuScrollToBottom={() => {
            if (affiliate_users_drop_down.last_page !== users_drop_down)
              dispatch(
                changeFilters({
                  name: 'users_drop_down',
                  value: users_drop_down + 1,
                })
              );
          }}
          onChange={(value) => {
            if (value) {
              dispatch(changeFilters({ name: 'user', value: value }));
            }
          }}
          placeholder="Affiliate ID..."
          value={user.value ? user : null}
        />
      )}
      {location.pathname === '/admin/users' && (
        <Select
          className="react-select"
          classNamePrefix="react-select"
          options={[
            { label: 'Affiliate', value: true },
            { label: 'All', value: false },
          ]}
          value={is_affiliate.value ? is_affiliate : null}
          placeholder="Select Type..."
          onChange={(value) => {
            if (value) {
              dispatch(changeFilters({ name: 'is_affiliate', value: value }));
            }
          }}
        />
      )}
      <StyledButton>
        {location.pathname !== '/admin/dashboard' && (
          <div
            className="filter"
            onClick={() => dispatch(changeFilters({ name: 'reset' }))}
          >
            <RiFilterOffLine />
          </div>
        )}
        <div
          className="filter"
          onClick={() => {
            if (!pending)
              dispatch(createRequestBody(location.pathname.split('/').at(-1)));
          }}
        >
          <AiOutlineSearch />
        </div>
      </StyledButton>
    </StyledFilters>
  );
};

const StyledFilters = styled.div`
  color: #fff;
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 15px;
  background-color: ${({ theme }) => theme.body_color};
  padding: 1.6vmin;

  .add-user {
    background: ${({ theme }) => theme.dark_input};
    color: ${({ theme }) => theme.font_gray};
    display: grid;
    place-items: center;
    cursor: pointer;
    &:hover {
      > svg {
        display: none;
      }
      &::after {
        content: 'Add User';
        width: 25px;
        height: 25px;
        white-space: nowrap;
        line-height: 2;
      }
    }
    > svg {
      font-size: 2rem;
    }
  }
  .filter {
    min-height: 56px;
    width: 100%;
  }
  .err {
    display: none;
  }
  @media (max-width: 1500px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledButton = styled.div`
  display: grid !important;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 5px;
  > div {
    height: 56px;
    width: 100%;
    display: grid;
    place-items: center;
    background-color: ${({ theme }) => theme.dark_input};
    color: ${({ theme }) => theme.font_gray};
    cursor: pointer;
  }
  > div:first-child:hover {
    > svg {
      display: none;
    }
    &::after {
      content: 'Clear';
      width: 25px;
      height: 25px;
      line-height: 2;
    }
  }
  > div:last-child:hover {
    > svg {
      display: none;
    }
    &::after {
      content: 'Search';
      width: 25px;
      height: 25px;
      line-height: 2;
    }
  }
  svg {
    font-size: 2rem;
  }
`;
export default AdminFilters;
