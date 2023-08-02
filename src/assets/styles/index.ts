import { Ref } from 'react';
import styled from 'styled-components';
import bg from 'assets/images/background_ddd.png';
import banner from 'assets/images/pattern-banner.svg';
export const StyledTrading = styled.div`
  display: grid;
  grid-template-areas:
    'chart chart chart chart menu menu'
    'chart chart chart chart menu menu'
    'chart chart chart chart menu menu'
    'footer footer footer footer footer footer';
  grid-gap: 32px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  > div,
  > footer {
    background-color: ${({ theme }) => theme.background_color};
  }
  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    grid-template-areas:
      'chart menu'
      'chart menu'
      'chart menu'
      'footer footer';
  }
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

export const NotificationStatus = styled.div<{
  style?: Record<string, string | number>;
  read?: boolean;
}>`
  background-color: ${({ read }) =>
    read ? 'transparent' : '#fa5252'} !important;
  width: 8px;
  height: 8px;
  border-radius: 1800px;
  margin-right: 16px;
  ${({ style }) => style}
`;

export const StyledLogo = styled.div<{ logo: string }>`
  background-image: url(${({ logo }) => logo});
  background-color: ${({ theme }) => theme.background_color};
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 30px;
  height: 30px;
  margin-right: 3px;
  margin-top: 5px;
`;

export const StyledBorder = styled.div<{ isSell: boolean }>`
  width: 3px;
  background: ${({ isSell }) => (isSell ? '#AF2F56' : '#09a087')};
  height: 30px;
  float: left;
  margin: 5px 3px 0 0;
`;

export const Scroll = styled.div<{ height?: string | any }>`
  height: ${({ height }) => height};
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const ChartContainer = styled.div<{ overflow?: boolean }>`
  height: 100%;
  background-color: ${({ theme }) => theme.background_color};
  padding: 1.6vmin;
  overflow: hidden;
`;

export const StyledStepsModal = styled.div`
  background: ${({ theme }) => theme.background_color};
  width: 768px;
  display: flex;
  flex-direction: column;
  .active-selected {
    outline: 2px solid #3968fc;
    border-radius: 8px;
  }
  .steps {
    display: flex;
    margin-bottom: 24px;
    h2 {
      width: calc(100% / 3);
      margin: 0;
      text-align: left;
      color: ${({ theme }) => theme.font_light_gray};
    }
  }
`;

export const StyledNavDropDown = styled.div<{
  dropDownOpen: boolean;
  navbarClosed: boolean;
  ref?: Ref<HTMLDivElement>;
}>`
  > div {
    background-color: ${({ theme, dropDownOpen, navbarClosed }) =>
      navbarClosed
        ? '#3968fc'
        : dropDownOpen
        ? theme.font_white
        : 'transparent'};
    border-radius: ${({ navbarClosed }) =>
      !navbarClosed ? '8px 8px 0 0 !important' : '8px !important'};
    > svg > path {
      fill: ${({ navbarClosed }) => (navbarClosed ? '#fff' : '')} !important;
    }
  }
  .arrow {
    transform: ${({ dropDownOpen }) =>
      dropDownOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
  > section {
    background-color: ${({ theme }) => theme.font_white};
    padding-left: 1.6vmin;
    padding-right: 1.6vmin;
    border-radius: ${({ dropDownOpen }) =>
      dropDownOpen ? '0 0 8px 8px !important' : ''};
    padding-bottom: 1.6vmin;
    width: ${({ dropDownOpen }) => (dropDownOpen ? '100%' : 0)};
    height: ${({ dropDownOpen }) => (dropDownOpen ? '100%' : 0)};
    transition: all 0.3s;
    ${({ dropDownOpen }) => !dropDownOpen && { padding: '0 !important' }}
    > article {
      padding: ${({ dropDownOpen }) => (dropDownOpen ? '1.6vmin' : 0)};
      border-radius: 8px;
      background-color: ${({ theme }) => theme.body_color};
      cursor: pointer;
      text-transform: capitalize;
      &:not(:last-child) {
        margin-bottom: 5px;
      }
      > span {
        font-size: ${({ dropDownOpen }) => (dropDownOpen ? '1.6rem' : 0)};
        transition: all 0.3s;
      }
    }
  }
`;

export const Gradient = styled.div<{
  image?: string;
  deg?: string;
  color?: string;
}>`
  background: linear-gradient(
      ${({ deg }) => (deg ? deg : '0')}deg,
      ${({ theme, color }) => (color ? theme[color] : theme.dark_input)} 75%,
      ${({ theme, color }) => (color ? theme[color] : theme.dark_input)}00 100%
    ),
    url(${({ image }) => (image ? image : bg)});
`;

export const BackgroundBanner = styled.div`
  height: 160px;
  width: 100%;
  background-image: url(${banner});
  background-size: cover;
  background-repeat: no-repeat;
  padding-bottom: 24px;
  padding-left: 32px;
  display: flex;
  align-items: flex-end;
`;

export const StyledSoon = styled.div<{ open?: boolean }>`
  margin-left: auto;
  background: #3968fc;
  color: #fff;
  border-radius: 4px;
  font-weight: 700;
  padding: ${({ open }) => (open ? '4px 8px' : 0)};
  font-size: 1.2rem;
  display: ${({ open }) => (open ? 'block' : 'none')};
  line-height: 16px;
  justify-self: flex-end;
`;
