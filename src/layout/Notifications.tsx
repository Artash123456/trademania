import { useRef } from 'react';
import styled from 'styled-components';
import { NotificationsTable } from 'components';
import { useDispatch } from 'react-redux';
import { fetchAllNotifications } from 'redux/actions/notification_actions';
let isRequested = 800,
  currentPage = 0,
  top = 0;
const Notifications = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const handleScroll = () => {
    if (!scrollRef || !scrollRef.current) return;
    const { scrollTop } = scrollRef.current;
    if (scrollTop > top) {
      top = scrollTop;
    }
    if (isRequested < top + 800) {
      isRequested += 800;
      currentPage++;
      dispatch(
        fetchAllNotifications({ page: currentPage, filter_type: 'scroll' })
      );
    }
  };
  return (
    <StyledNotifications className="container">
      <h1>NOTIFICATIONS </h1>
      <div onScroll={handleScroll} ref={scrollRef}>
        <NotificationsTable />
      </div>
    </StyledNotifications>
  );
};
const StyledNotifications = styled.div`
  .body {
    max-height: 600px;
    min-height: 530px;
    overflow: auto;
  }
  .head {
    overflow: unset;
  }
`;
export default Notifications;
