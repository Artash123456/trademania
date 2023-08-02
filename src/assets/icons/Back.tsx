import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Back = () => {
  const navigate = useNavigate();
  return (
    <StyledBack onClick={() => navigate(-1)}>
      <IoChevronBackOutline />
    </StyledBack>
  );
};
const StyledBack = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.light_gray};
  display: grid;
  place-items: center;
  cursor: pointer;
  svg {
    font-size: 18px;
    color: ${({ theme }) => theme.font_white};
  }
`;
export default Back;
