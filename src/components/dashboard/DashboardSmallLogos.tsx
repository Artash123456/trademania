import { useAppSelector } from 'context';
import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { DashboardElement } from 'types';

interface Props {
  elem: DashboardElement;
  isTotal: boolean;
}
const DashboardSmallLogos: FC<Props> = ({ elem = { logo: '' }, isTotal }) => {
  const { images } = useAppSelector(({ dashboard }) => dashboard);
  const { markets } = useAppSelector(({ markets }) => markets);
  const bg_image = useMemo(() => {
    if (isTotal) {
      const img = [];
      for (let e of markets) {
        if (e.has_credential) {
          img.push(e.name);
        }
      }
      return img;
    } else {
      return images[elem?.logo];
    }
  }, [isTotal, elem, images, markets]);
  return (
    <StyledLogos isTotal={isTotal}>
      {isTotal ? (
        <>
          {Array.isArray(bg_image) &&
            bg_image.map((item: string) => (
              <div
                key={item}
                style={{
                  backgroundImage: `url(${images[item]})`,
                }}
              />
            ))}

          {Array.isArray(bg_image) && bg_image?.length - 3 > 0 ? (
            <span>{`+ ${bg_image?.length - 3}`}</span>
          ) : (
            ''
          )}
        </>
      ) : (
        <div
          style={{
            backgroundImage: `url(${bg_image})`,
          }}
        />
      )}
    </StyledLogos>
  );
};

const StyledLogos = styled.div<{ isTotal?: boolean }>`
  display: flex;
  margin-left: 5px;
  div {
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    padding: 15px;
    background-size: 90% 100%;
    background-origin: padding-box;
    background-position: center;
    background-color: ${({ theme }) => theme.dark_input};
    position: relative;
    &:not(:last-child) {
      margin-right: 5px;
    }
    &:nth-child(n + 4) {
      display: none;
    }
  }
  > span {
    font-size: 16px;
    line-height: 36px;
    font-weight: 600;
  }
  ${({ isTotal, theme }) =>
    isTotal
      ? `&:hover {
    position: absolute;
    background-color: ${theme.background_color};
    div {
      &:nth-child(n + 4) {
        display: block;
      }
    }
    span {
      display: none;
    }
  }`
      : ''}
`;
export default DashboardSmallLogos;
