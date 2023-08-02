import { FC, useMemo } from 'react';
import { Select } from 'components';
import { useAppSelector } from 'context';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { MarketTypes } from 'types';

const MarketDropDown: FC<{
  onChange: (value: { value: MarketTypes; id: string; name: string }) => void;
}> = ({ onChange }) => {
  const { markets } = useAppSelector(({ markets }) => markets);
  const [search] = useSearchParams();
  const dropDownOptions = useMemo(() => {
    if (!markets.length) return [];
    const has_credential = markets.filter((item) => item.has_credential);
    if (!has_credential.length) return [];
    return has_credential.map((item) => ({
      label: (
        <StyledOption>
          <img
            src={
              import.meta.env.VITE_BASE_URL
                ? import.meta.env.VITE_BASE_URL + item?.icon
                : ''
            }
            width="25px"
            height="15px"
            alt="L"
          />
          <span>{item.name}</span>
        </StyledOption>
      ),
      name: item.name,
      value: item.name,
      id: item.id,
    }));
  }, [markets]);
  const placeholder = dropDownOptions.find(
    (item) => item.name === search.get('market')
  );
  return (
    <Select
      options={dropDownOptions}
      label="Exchange"
      placeholder={placeholder?.label}
      onChange={(value) => {
        onChange(value);
      }}
    />
  );
};
const StyledOption = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 32px;
    height: 32px;
    margin-right: 16px;
  }

  > span {
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 19px;
    text-transform: uppercase;
  }
`;
export default MarketDropDown;
