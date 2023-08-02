import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { SearchInput, CustomDatePicker, Select } from 'components';
import { changeFilters, createRequestBody } from 'redux/reducers/affiliate';
import { HiFilter } from 'react-icons/hi';
import { useAppSelector, useAppDispatch } from 'context';
import { RiFilterOffFill } from 'react-icons/ri';
const AffiliateFilters: FC<{ isGeneral?: boolean }> = ({ isGeneral }) => {
  const { markets } = useAppSelector(({ markets }) => markets);
  const { search, date, market, user } = useAppSelector(
    ({ affiliate }) => affiliate.filters
  );
  const { my_affiliates } = useAppSelector(({ affiliate }) => affiliate);
  const { pending } = useAppSelector(({ loading }) => loading);
  const dispatch = useAppDispatch();
  const marketsOptions = useMemo(() => {
    if (!markets.length) return [];
    return markets.map((item) => ({
      label: item.name.toUpperCase(),
      value: `${item.id}`,
    }));
  }, [markets]);
  const userOptions = useMemo(() => {
    if (!my_affiliates?.data?.length) return [];
    return my_affiliates?.data?.map((item) => ({
      label: item.email,
      value: item.id,
    }));
  }, [my_affiliates?.data]);
  return (
    <StyledFilters>
      <SearchInput
        onChange={(e) =>
          dispatch(changeFilters({ name: 'search', value: e.target.value }))
        }
        placeholder="Search..."
        value={search}
      />

      <CustomDatePicker
        onChange={(value) => {
          dispatch(
            changeFilters({
              name: 'date',
              value: [value[0], value[1]],
            })
          );
        }}
        values={[
          date[0] ? new Date(date[0]) : null,
          date[1] ? new Date(date[1]) : null,
        ]}
        isClearable
      />
      {isGeneral && (
        <>
          <Select
            options={marketsOptions}
            value={market.label ? market : null}
            placeholder="Select Market..."
            onChange={(value) => {
              if (value) {
                dispatch(changeFilters({ name: 'market', value: value }));
              }
            }}
          />
          <Select
            options={userOptions}
            placeholder="Select User..."
            value={user.label ? user : null}
            onChange={(value) => {
              if (value) {
                dispatch(changeFilters({ name: 'user', value: value }));
              }
            }}
          />
        </>
      )}
      <span className="flac ">
        <StyledButton
          onClick={() => {
            if (!pending)
              dispatch(
                createRequestBody(isGeneral ? 'orders-earnings' : 'referrals')
              );
          }}
        >
          <HiFilter />
        </StyledButton>
        <StyledButton
          onClick={() => dispatch(changeFilters({ name: 'reset' }))}
        >
          <RiFilterOffFill />
        </StyledButton>
      </span>
    </StyledFilters>
  );
};

const StyledFilters = styled.div`
  color: #fff;
  display: flex;
  margin-left: auto;
  margin-right: 11px;
  gap: 15px;
  > div {
    width: 170px;
  }
  .react-select {
    width: 100%;
  }
  .react-datepicker__input-container > input,
  .react-select__control {
    height: auto;
    min-height: auto;
  }
  > div {
    height: 38px;
    background-color: ${({ theme }) => theme.dark_input} !important;
    display: flex;
    align-items: center;
    > input {
      outline: none !important;
    }
  }

  button {
    min-height: 38px;
  }
  @media (max-width: 1450px) {
    grid-area: 2/1/2/3;
    flex-wrap: wrap;
    gap: 5px;
    > div {
      width: fit-content;
    }
  }
  @media (max-width: 500px) {
    > div,
    .flac {
      gap: 5px;
      > span {
        margin-right: 0;
      }
    }
  } ;
`;
const StyledButton = styled.span`
  background-color: ${({ theme }) => theme.dark_input};
  display: grid;
  justify-content: center;
  border-radius: 8px;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-right: 15px;
  cursor: pointer;
  > svg {
    font-size: 2rem;
    color: ${({ theme }) => theme.font_gray};
  }
  @media (max-width: 1450px) {
    margin-right: 5px;
  } ;
`;
export default AffiliateFilters;
