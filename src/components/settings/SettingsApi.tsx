import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCredentials } from 'redux/actions/settings_actions';
import styled from 'styled-components';
import { ExchangesContainer, SearchInput, Warning } from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { MarketTypes } from 'types';
import { toast } from 'react-toastify';
import { Mail } from 'assets/icons';

const SettingsApi = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { two_factor_confirmed, markets } = useAppSelector(
    ({ user, markets }) => ({
      two_factor_confirmed: user?.data?.two_factor_confirmed,
      markets: markets.markets,
    })
  );

  const handleAddApiConnection = (elem: MarketTypes) => {
    if (!two_factor_confirmed) {
      toast.warn(
        <Warning
          message="Please enable two-factor authentication so you can connect to the marketplaces."
          onConfirm={() => navigate('/settings/safety')}
          button_text="Activate"
        />
      );
    } else {
      if (elem.id) {
        dispatch(fetchCredentials(elem));
      }
    }
  };
  return (
    <div className="settings">
      <h2>API connections</h2>
      <h3>{translation('choose_exchanges')}</h3>
      <h4>{translation('set_13_paragraph')}</h4>
      <StyledWarning>
        <span>Warning</span>
        <p>Your exchange is not listed? No problem! Just write us an email.</p>
        <a href={`mailto:${import.meta.env.VITE_CONTACT_MAIL}`}>
          <Mail /> {translation('write_email')}
        </a>
      </StyledWarning>
      <SearchInput
        placeholder={translation('search')}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <StyledWrapper>
        {markets.map((elem, index: number) => {
          let hasItem = false;
          if (!elem.name && !search) {
            hasItem = true;
          }
          if (
            elem.name &&
            elem.name.toLowerCase().startsWith(search.toLowerCase())
          ) {
            hasItem = true;
          }
          return (
            <Fragment key={index}>
              {hasItem && (
                <ExchangesContainer
                  elem={elem}
                  onClick={() => {
                    if (elem.name) handleAddApiConnection(elem);
                  }}
                />
              )}
            </Fragment>
          );
        })}
      </StyledWrapper>
    </div>
  );
};

const StyledWarning = styled.div`
  background-color: ${({ theme }) => theme.dark_input};

  padding: 1.6vmin;
  margin-bottom: 32px;
  span {
    font-weight: 600;
    font-size: 2rem;
    line-height: 27px;
    color: ${({ theme }) => theme.font_gray};
  }
  p {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    color: ${({ theme }) => theme.light_gray} !important;
  }
  > a {
    background-color: #3968fc;
    padding: 12px 83px;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 16px;
    display: flex;
    width: fit-content;
    border-radius: 8px;
    margin-left: auto;
    &:focus,
    &:active,
    &:visited {
      color: #fff;
    }
    > svg {
      margin-right: 8px;
    }
  }
`;
const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin: 56px 0 23px 0;

  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    margin-top: 25px;
  }
  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export default SettingsApi;
