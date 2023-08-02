import { FC } from 'react';
import styled from 'styled-components';
import { Devices } from 'assets/icons';

const DeviceSessions: FC<{
  item: {
    agent: string;
    ip_address: string;
    is_current_device: boolean;
    last_active: string;
  };
}> = ({ item }) => (
  <StyledDevices>
    <Devices />
    <div>
      <span title={item.agent}>{item.agent}</span>
      <span>
        {item.ip_address} ․ {item.last_active}
      </span>
    </div>
  </StyledDevices>
);

const StyledDevices = styled.div`
  display: flex;
  background: ${({ theme }) => theme.dark_input};

  padding: 1.6vmin;
  &:not(:last-child) {
    margin-bottom: 24px;
  }
  > svg {
    margin-right: 16px;
    rect {
      fill: ${({ theme }) => theme.font_white};
    }
    path {
      fill: ${({ theme }) => theme.light_gray};
    }
  }
  > div {
    > span {
      max-width: 280px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 22px;
      &:first-child {
        color: ${({ theme }) => theme.font_gray};
      }
      &:last-child {
        color: ${({ theme }) => theme.light_gray};
      }
    }
  }
  div {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    > span:last-child {
      max-width: 200px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  svg {
    font-size: 3.5rem;
    margin-right: 5px;
  }
  .this-device {
    color: ${({ theme }) => theme.submit_button_background};

    margin-left: 8px;
  }
`;

export default DeviceSessions;
