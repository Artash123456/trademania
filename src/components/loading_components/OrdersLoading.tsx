import React from 'react';
import styled from 'styled-components';

const OrdersLoading = () => {
  return (
    <StyeledOrders className="loading-anim">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </StyeledOrders>
  );
};

const StyeledOrders = styled.div`
  width: 300px;
  padding: 16px;
  > div {
    background: ${({ theme }) => theme.font_gray};
    height: 25px;
    margin-bottom: 5px;
  }
`;
export default OrdersLoading;
