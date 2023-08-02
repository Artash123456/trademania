import styled from 'styled-components';
import { ProfileImage } from 'assets/icons';
import { useAppSelector } from 'context';
import { FC } from 'react';

const ProfileInfo: FC<{ open?: boolean }> = ({ open }) => {
  const { data } = useAppSelector(({ user }) => user);
  return (
    <StyledProfile
      img={import.meta.env.VITE_BASE_URL + '/' + data.picture}
      open={open}
    >
      {data.picture ? <div /> : <ProfileImage />}
      <span>{data.first_name}</span>
    </StyledProfile>
  );
};
const StyledProfile = styled.div<{ img?: string; open?: boolean }>`
  padding-left: ${({ open }) => (open ? '32px' : '16px')};
  padding-right: 16px;
  display: grid;
  max-height: 56px;
  grid-template-columns: 56px auto;
  grid-column-gap: 16px;
  overflow: hidden;
  align-items: center;
  > div {
    background-image: url(${({ img }) => img});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    border-radius: 50%;
  }
  > span {
    color: ${({ theme }) => theme.font_gray};
    font-weight: 500;
    font-size: ${({ open }) => (open ? '1.6rem' : 0)};
    line-height: 22px;
  }
  @media (max-width: 550px) {
    max-height: 30px;
    grid-template-columns: 30px auto;
    padding-left: 8px;
    padding-right: 8px;
  }
`;
export default ProfileInfo;
