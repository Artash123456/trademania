import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  no_credentials?: boolean;
  modal?: boolean;
}

const DashboardMockLong: FC<Props> = ({ no_credentials, modal }) => {
  if (!no_credentials && !modal)
    return <StyledAddCred>Please add credentials</StyledAddCred>;
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>aaaaaaaaa</th>
          <th>aaaaaaaaa</th>
          <th>aaaaaaaaa</th>
          <th>aaaaaaaaa</th>
          <th>aaaaaaaaa</th>
          <th>aaaaaaaaa</th>
          <th>aaaaaaaaa</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>aaaaaaaaaa</td>
          <td>aaaaaaaaaa</td>
          <td>aaaaaaaaaa</td>
          <td>aaaaaaaaaa</td>
          <td>aaaaaaaaaa</td>
          <td>aaaaaaaaaa</td>
          <td>aaaaaaaaaa</td>
        </tr>
        <tr>
          <td>aaaaaaaaaa</td>
          <td>aaaaaaaaaa</td>
          <td>aaaaaaaaaa</td>
          <td>aaaaaaaaaa</td>
          <td>aaaaaaaaaa</td>
          <td>aaaaaaaaaa</td>
          <td>aaaaaaaaaa</td>
        </tr>
        <tr>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
        </tr>
        <tr>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
        </tr>
        <tr>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
          <td>aaaaaaaaa</td>
        </tr>
      </tbody>
    </StyledTable>
  );
};

const StyledAddCred = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-top: 20px;
  color: ${({ theme }) => theme.font_gray};
`;

const StyledTable = styled.table`
  width: 100%;
  text-align: center;
  filter: blur(3px);
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
export default DashboardMockLong;
