import { useEffect, useMemo, useState } from 'react';
import {
  deleteSubAccount,
  fetchSubAccountCustomers,
} from 'redux/actions/settings_actions';
import styled from 'styled-components';
import { Button, Table, Warning } from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { Modal } from 'components';
import { openModal } from 'redux/actions/other_actions';
import AddSubaccountModal from './subaccounts/AddSubaccountModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SettingsSubaccounts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { add_subaccount } = useAppSelector(({ modal }) => modal.types);
  const [active, setActive] = useState({ id: 0, slug: '' });
  const { customers } = useAppSelector(({ settings }) => settings);
  useEffect(() => {
    if (active) dispatch(fetchSubAccountCustomers(active.id));
  }, [dispatch, active]);
  const { markets } = useAppSelector(({ markets }) => markets);
  const myMarkets = useMemo(() => {
    const has_credential = markets.filter((item) => item.has_credential);
    if (has_credential.length) {
      setActive({ id: has_credential[0].id, slug: has_credential[0].slug });
      return has_credential;
    }
    return [];
  }, [markets]);
  return (
    <>
      <StyledSub className="settings">
        <h2>Subaccounts </h2>
        <h3 className="flacjsb">
          Accounts
          <div className="button-navigation">
            {myMarkets.map((item) => (
              <span
                className={active.id === item.id ? 'active' : ''}
                key={item.name}
                onClick={() => setActive({ id: item.id, slug: item.slug })}
              >
                {item.name}
              </span>
            ))}
          </div>
        </h3>
        <Table
          rows={customers?.subaccounts?.filter(
            (item) => item.single_credential
          )}
          columns={[
            {
              name: translation('name'),
              selector: (elem) =>
                `${elem.first_name ? elem.first_name : ''} ${
                  elem.last_name ? elem.last_name : ''
                }`,
            },
            {
              name: translation('api_key'),
              selector: (elem) => elem?.single_credential?.api_key,
            },
            { name: 'Status', selector: () => 'Customer' },
            {
              name: '',
              selector: (elem) => (
                <span
                  className="unfollow canc"
                  style={{ lineHeight: '2' }}
                  onClick={() =>
                    dispatch(
                      deleteSubAccount({
                        id: elem.single_credential.id,
                        market: elem.single_credential.market_id,
                      })
                    )
                  }
                >
                  DELETE
                </span>
              ),
            },
          ]}
        />
        <Button.Green
          value="add_customer"
          onClick={() => {
            if (!myMarkets?.length) {
              toast.warn(
                <Warning
                  message="You didn't connect to any of marketplaces"
                  onConfirm={() => navigate('/settings/api-connections')}
                  button_text="Connect Marketplace"
                />
              );
            } else {
              dispatch(openModal('add_subaccount'));
            }
          }}
        />
      </StyledSub>
      <Modal
        open={add_subaccount}
        onClose={() => dispatch(openModal('add_subaccount'))}
        with_close_icon="add_subaccount"
      >
        <AddSubaccountModal market={active} />
      </Modal>
    </>
  );
};
const StyledSub = styled.div`
  height: 100vh;
  > button {
    margin-top: 30px;
    width: 100%;
  }
`;
export default SettingsSubaccounts;
