import { useEffect } from 'react';
import {
  fetchAllNotifications,
  markAsRead,
  removeNotification,
} from 'redux/actions/notification_actions';
import styled from 'styled-components';
import { Table } from 'components';
import { useAppDispatch, useAppSelector } from 'context';
import { NotificationStatus } from 'assets/styles';
import { filterNotifications } from 'redux/reducers/notifications';
import { FaRegTrashAlt } from 'react-icons/fa';

const NotificationsTable = () => {
  const dispatch = useAppDispatch();
  const { notifications, filter } = useAppSelector(
    ({ notifications }) => notifications
  );
  const { pending } = useAppSelector(({ loading }) => loading);

  useEffect(() => {
    dispatch(fetchAllNotifications({ filter_type: 'no_filter' }));
  }, [dispatch]);
  return (
    <StyledTable>
      <div className="head flacjsb">
        NOTIFICATIONS
        <div className="button-navigation">
          {' '}
          {filter.map((item) => (
            <span
              onClick={() => dispatch(filterNotifications(item.name))}
              key={item.name}
              className={item.active ? 'active' : ''}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
      <Table
        columns={[
          {
            name: 'Title',
            selector: (elem) => (
              <div
                className="flac"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (!Boolean(elem.read_at) && !pending)
                    dispatch(markAsRead(elem.id));
                }}
              >
                <NotificationStatus read={Boolean(elem.read_at)} />
                <span>{elem.head}</span>
              </div>
            ),
          },
          {
            name: 'Message',
            selector: (elem) => <span>{elem.message}</span>,
          },
          {
            name: 'Created at',
            selector: (elem) => elem.created_at,
          },
          {
            name: 'Read at',
            selector: (elem) => elem.read_at || '-',
          },
          {
            name: '',
            selector: (elem) => (
              <FaRegTrashAlt
                className="trash show-on-hover"
                onClick={() => {
                  if (!pending) dispatch(removeNotification(elem.id));
                }}
              />
            ),
          },
        ]}
        rows={notifications}
      />
    </StyledTable>
  );
};
const StyledTable = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.background_color};
  min-height: 150px;
  border-radius: 8px;
  padding: 1.6vmin;
`;
export default NotificationsTable;
