import { getImage, useAppDispatch, useAppSelector } from 'context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAddress } from 'redux/actions/user_actions';
import styled from 'styled-components';

const AddBalance = () => {
  const { balance } = useAppSelector(({ user }) => user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);
  return (
    <Button onClick={() => navigate('/transactions')}>
      <span>Balance</span>
      <span className="flacjsb">
        {balance}
        <img
          src={getImage('usdt', true, false)}
          width="25px"
          height="25px"
          alt="usdt"
        />
      </span>
    </Button>
  );
};

const Button = styled.div`
  background-color: #3968fc;
  padding: 8px;
  color: #fff;
  text-align: left;
  line-height: 1;
  max-width: 150px;
  display: grid;
  cursor: pointer;
  > span {
    font-size: 1.6rem;
  }
  > span:first-child {
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 16px;
  }
`;
export default AddBalance;
