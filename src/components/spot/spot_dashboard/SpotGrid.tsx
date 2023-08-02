import styled from 'styled-components';
import { SpotGridCard } from 'components';
import { useAppSelector } from 'context';

const SpotGrid = () => {
  const { spot_list, market } = useAppSelector(({ spot }) => ({
    spot_list: spot.spot_list,
    market: spot.activeMarket.name,
  }));
  if (!spot_list || !market) return <></>;
  return (
    <StyledGrid>
      {spot_list?.[market]?.map((item, index) => (
        <SpotGridCard elem={item} key={index} />
      ))}
    </StyledGrid>
  );
};
const StyledGrid = styled.div`
  padding: 1.6vmin;
  background-color: ${({ theme }) => theme.background_color};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 21px;

  @media (max-width: 768px) {
    overflow: auto;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    max-height: 460px;
  }
  @media (max-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;
    padding: 3px;
  }
`;
export default SpotGrid;
