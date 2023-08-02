import { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'components';
import { Rating } from 'react-simple-star-rating';
import { getMyTraders, postFeedback } from 'redux/actions/copy_actions';
import { PostFeedbackType } from 'types';
import { useAppDispatch, useAppSelector } from 'context';

const CopyRateUserModal = () => {
  const dispatch = useAppDispatch();
  const { rate_trader, post_feedback, isDemo } = useAppSelector(
    ({ copy, loading, markets }) => ({
      rate_trader: copy.rate_trader,
      post_feedback: loading.post_feedback,
      isDemo: markets.isDemo,
    })
  );
  const [value, setValue] = useState<PostFeedbackType>({
    rate: 0,
    text: '',
    receiver_id: rate_trader?.open_trader?.user_id,
  });
  return (
    <StyledModal>
      <h4>
        Write review{' '}
        {rate_trader?.open_trader?.nickname
          ? 'for ' + rate_trader?.open_trader?.nickname
          : ''}
      </h4>
      <Rating
        fillColor="gold"
        ratingValue={value.rate}
        size={50}
        onClick={(e) => setValue({ ...value, rate: e })}
      />
      <textarea
        onChange={(e) => setValue({ ...value, text: e.target.value })}
        value={value.text}
        placeholder="Describe your trading experience."
      />
      <Button.Green
        disabled={!value.rate && !value.text}
        value="submit_review"
        pending={post_feedback}
        onClick={() =>
          dispatch(postFeedback({ values: value })).then(() =>
            dispatch(getMyTraders({ isDemo }))
          )
        }
      />
    </StyledModal>
  );
};
const StyledModal = styled.div`
  background: #fff;
  padding: 25px;
  display: grid;
  place-items: center;
  position: relative;
  width: 500px;

  > h4 {
    font-size: 2rem;
    line-height: 2.1rem;
    font-weight: bold;
    letter-spacing: 0.6px;
    color: ${({ theme }) => theme.font_gray};
  }
  > textarea {
    width: 100%;
    min-height: 50px;
    max-height: 150px;
    padding: 16px;
    border-radius: 8px;
    resize: vertical;
  }
  > button {
    padding: 25px 35px;
    margin-top: 20px;
    line-height: 2px;
  }
  @media (max-width: 600px) {
    width: 100%;

    > textarea {
      width: 100%;
      min-height: 50px;
      max-height: 150px;
    }
    > button {
      padding: 5px;
      width: 100%;
    }
  }
`;
export default CopyRateUserModal;
