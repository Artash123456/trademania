import { useRef, FC, MouseEventHandler, ReactNode } from 'react';

import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useAppDispatch, useClickOutside } from 'context';
import { Toast } from 'components';
import { AiFillCloseSquare } from 'react-icons/ai';
import { openModal } from 'redux/actions/other_actions';

const modal = document.getElementById('modal-root') as HTMLDivElement;

interface Props {
  children?: ReactNode;
  onClose?: MouseEventHandler<HTMLDivElement>;
  open: boolean;
  with_close_icon?: string;
}

const Modal: FC<Props> = ({
  children,
  onClose = () => {},
  open,
  with_close_icon,
}) => {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, onClose);
  const dispatch = useAppDispatch();

  if (open)
    return ReactDOM.createPortal(
      <>
        <Toast />
        <StyledModal>
          <div ref={wrapperRef}>
            {with_close_icon && (
              <AiFillCloseSquare
                onClick={() => dispatch(openModal(with_close_icon))}
                className="close"
              />
            )}
            {children}
          </div>
        </StyledModal>
      </>,
      modal
    );
  return <></>;
};

const StyledModal = styled.div`
  background-color: transparent;
  padding: 32px;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  > div {
    display: inline-flex;
    margin: 0 auto;
    position: relative;
    > div {
      padding: 32px;
    }
    > svg {
      color: ${({ theme }) => theme.font_gray};
      font-size: 30px;
      cursor: pointer;
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 2;
    }
  }
  @media (max-width: 1150px) {
    padding: 16px;
    > div {
      width: 100%;
      overflow: hidden;
      > div,
      > form {
        padding: 16px;
        width: 100% !important;
      }
    }
  }
  @media (max-width: 550px) {
    padding: 8px;
    > div {
      > div,
      > form {
        padding: 8px;
      }
    }
  }
`;

export default Modal;
