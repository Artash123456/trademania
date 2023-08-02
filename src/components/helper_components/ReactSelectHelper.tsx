import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from 'context';
import { MarketTypes, PairTypes } from 'types';
import { Select } from 'components';
interface Props {
  pairs: PairTypes[];
  onChangePairs: (value: PairTypes) => void;
  onChangeMarkets: (value: MarketTypes) => void;
  value: string;
  placeholder: string;
}

const marketOptions = (
  markets: { name: string; id: string | number; icon?: string }[] | []
): Array<{
  label: JSX.Element;
  name: string;
  value: string;
}> => {
  const options = [];
  for (let item of markets) {
    if (item.name !== 'All')
      options.push({
        label: (
          <div className="flac">
            <img
              src={
                import.meta.env.VITE_BASE_URL
                  ? import.meta.env.VITE_BASE_URL + item?.icon
                  : ''
              }
              width="40px"
              height="30px"
              alt="L"
            />
            <span
              style={{
                fontSize: '1.6rem',
                marginLeft: '5px',
                textTransform: 'uppercase',
              }}
            >
              {item.name}
            </span>
          </div>
        ),
        name: item.name,
        value: item.name,
      });
  }
  return options;
};

const ReactSelectHelper: FC<Props> = ({
  pairs,
  onChangePairs,
  onChangeMarkets,
  value,
  placeholder,
}) => {
  const [search] = useSearchParams();
  const { markets } = useAppSelector(({ spot }) => spot);
  const marketPlaceholder = marketOptions(markets).find(
    (item) => item.name === search.get('market')
  );
  return (
    <StyledDropDown>
      <Select
        classNamePrefix="react-select"
        className="react-select"
        options={marketOptions(markets)}
        placeholder={marketPlaceholder?.label}
        onChange={(value) => onChangeMarkets(value)}
        isSearchable={true}
      />
      <Select
        classNamePrefix="react-select"
        className="react-select"
        maxMenuHeight={300}
        placeholder={placeholder}
        onChange={(value) => onChangePairs(value)}
        options={pairs}
        value={value}
      />
    </StyledDropDown>
  );
};

const StyledDropDown = styled.div`
  margin-bottom: 16px;
  .react-select__control {
    margin-top: 16px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.dark_input} !important;
    height: 56px;
    border-width: 0;
    .react-select__placeholder,
    .react-select__single-value {
      display: flex;
      align-items: center;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.font_light_gray};

      input {
        height: 40px;
      }
    }
    .react-select__indicators {
      height: 100%;
      .react-select__indicator-separator {
        display: none;
      }
    }
    .react-select__input-container {
      height: 40px;
    }
  }
`;

export default ReactSelectHelper;
