import { cloneElement, FC, JSXElementConstructor, ReactElement } from 'react';
import styled from 'styled-components';

const Card: FC<{
  heading: string;
  count: number | string;
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  count2?: number | string;
  icon2?: ReactElement<any, string | JSXElementConstructor<any>>;
  icon_color: string;
  icon_2_color?: string;
  total?: string | number;
}> = ({
  heading,
  count,
  icon,
  icon_color,
  count2,
  icon2,
  icon_2_color,
  total,
}) => {
  return (
    <StyledCard>
      <h5>{heading}</h5>
      <div>
        <p>{count}</p>
        {cloneElement(icon, { color: icon_color })}
      </div>
      {count2 && icon2 && (
        <div>
          <p>{count2}</p>
          {cloneElement(icon2, {
            color: icon_2_color,
          })}
        </div>
      )}

      <div>{total ? <p>Total {total}</p> : ''}</div>
    </StyledCard>
  );
};
const StyledCard = styled.div<{ icon_color?: string }>`
  background-color: ${({ theme }) => theme.background_color};
  padding: 1vmin;
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  h5 {
    color: ${({ theme }) => theme.font_gray};
    font-size: 2rem;
    margin: 0;
    border-bottom: 1px solid ${({ theme }) => theme.font_gray}36;
    padding-bottom: 5px;
  }
  p {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    line-height: 21px;
    text-align: left;
  }
  > div {
    display: grid;
    grid-template-columns: auto 50px;
    place-items: center flex-start;
    > svg {
      font-size: 2.5rem;
    }
  }
`;
export default Card;
