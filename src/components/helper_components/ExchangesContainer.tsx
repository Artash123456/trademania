import { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { ExchangesLoading } from 'components';
import { MarketTypes } from 'types';

interface Props {
  elem?: MarketTypes;
  onClick?: MouseEventHandler<HTMLDivElement>;
  loading?: boolean;
  width?: string;
  bot?: boolean;
  className?: string;
}
const ExchangesContainer: FC<Props> = ({
  elem,
  onClick,
  loading,
  width = '',
  bot,
  className,
}) => {
  if (loading) return <ExchangesLoading width={width} />;
  if (!elem) return <></>;
  return (
    <StyledContainer
      onClick={onClick}
      width={width}
      className={className}
      cred={Boolean(elem.has_credential)}
    >
      <div>
        <img src={import.meta.env.VITE_BASE_URL + elem.logo} alt="logo" />
      </div>
      {!bot && (
        <>
          <div className="hr" />
          <div>
            {elem.has_credential ? (
              <>
                <IoCheckmarkCircleOutline />
                <span>API Added</span>
              </>
            ) : (
              <>
                <IoIosAddCircleOutline />
                <span>Add API</span>
              </>
            )}
          </div>
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ width: string; cred?: boolean }>`
  background: ${({ theme }) => theme.dark_input};
  width: ${(props) => props.width};
  min-width: 110px;
  min-height: 85px;
  text-align: center;
  display: grid;
  grid-template-rows: 100px 1px auto;
  grid-template-columns: auto;
  cursor: pointer;

  > div:first-child {
    padding: 40px 0;
    > img {
      width: max(100px);
    }
  }
  .hr {
    margin: 0;
  }
  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 17px;
    svg {
      font-size: 2.4rem;
    }

    > span {
      font-weight: 600;
      font-size: 1.6rem;
      line-height: 22px;
    }
    svg,
    span {
      color: ${({ theme, cred }) =>
        cred ? theme.submit_button_background : theme.light_gray};
    }
  }
`;
export default ExchangesContainer;
