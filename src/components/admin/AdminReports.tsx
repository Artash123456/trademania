import PieChart3D from 'charts/PieChart3D';
import { fetchAdminMarketsIncome } from 'redux/actions/admin_actions';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'context';
import styled from 'styled-components';
import { createRequestBody } from 'redux/reducers/admin';
const AdminReports = () => {
  const dispatch = useAppDispatch();
  const {
    income_by_markets,
    orders_count_by_markets,
    users_count_by_markets,
    orders_count_by_source,
  } = useAppSelector(({ admin }) => admin.reports);
  const { request_body } = useAppSelector(({ admin }) => admin);

  useEffect(() => {
    dispatch(createRequestBody('reports'));
    dispatch(fetchAdminMarketsIncome({ values: JSON.parse(request_body) }));
  }, [dispatch, request_body]);
  return (
    <StyledReports>
      <PieChart3D
        data={income_by_markets}
        caption="Market Revenue"
        numberPrefix="$"
      />
      <PieChart3D data={orders_count_by_markets} caption="Orders by Markets" />
      <PieChart3D data={users_count_by_markets} caption="Users by Markets" />
      <PieChart3D data={orders_count_by_source} caption="Orders By Source" />
    </StyledReports>
  );
};
const StyledReports = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  > div {
    max-width: 100%;
    overflow: auto;
    background-color: ${({ theme }) => theme.body_color};
  }
  @media (max-width: 1360px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 890px) {
    grid-template-columns: auto;
  }
`;

export default AdminReports;
