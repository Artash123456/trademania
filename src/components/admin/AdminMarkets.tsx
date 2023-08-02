import { Button, Input } from 'components';
import { useAppDispatch, useAppSelector } from 'context';
import { Formik } from 'formik';
import { useEffect } from 'react';

import { RiEdit2Line } from 'react-icons/ri';
import {
  fetchAdminMarkets,
  updateMarketFee,
} from 'redux/actions/admin_actions';
import styled from 'styled-components';
import { adminAddMarketFee } from 'validations';

const AdminMarkets = () => {
  const { markets } = useAppSelector(({ admin }) => admin);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAdminMarkets());
  }, [dispatch]);
  return (
    <Table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Active Users</td>
          <td>Leverage Rebate</td>
          <td>Spot Rebate</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {markets.map((item) => (
          <Formik
            enableReinitialize
            key={item.id}
            initialValues={{
              market_id: item.id,
              leverage_fee: item.leverage_fee,
              spot_fee: item.spot_fee,
              open_input: false,
            }}
            validationSchema={adminAddMarketFee}
            onSubmit={(values) => dispatch(updateMarketFee({ values }))}
          >
            {({ setFieldValue, values, handleSubmit, errors, touched }) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div>
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}${item?.icon}`}
                        alt="sd"
                        width="30"
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.user_count}</td>
                  <td>
                    {item.name === 'binance' ? (
                      <span>auto calculate</span>
                    ) : (
                      <Input
                        name="spot_fee"
                        errors={errors?.spot_fee}
                        touched={touched?.spot_fee}
                        disabled={!values.open_input}
                      />
                    )}
                  </td>
                  <td>
                    {item.name === 'binance' ? (
                      <span>auto calculate</span>
                    ) : (
                      <Input
                        name="leverage_fee"
                        errors={errors?.leverage_fee}
                        touched={touched?.leverage_fee}
                        disabled={!values.open_input}
                      />
                    )}
                  </td>
                  <td>
                    {item.name !== 'binance' && (
                      <>
                        {values.open_input ? (
                          <Button.Add
                            value="save"
                            onClick={() => {
                              setFieldValue('open_input', false);
                              handleSubmit();
                            }}
                          />
                        ) : (
                          <RiEdit2Line
                            title="Edit"
                            onClick={() => {
                              setFieldValue('open_input', true);
                            }}
                            size={30}
                          />
                        )}
                      </>
                    )}
                  </td>
                </tr>
              );
            }}
          </Formik>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  background-color: ${({ theme }) => theme.body_color};
  border-radius: 8px;
  padding: 1.6vmin;
  min-width: 600px;
  overflow: auto;
  tr {
    height: 30px;
    color: ${({ theme }) => theme.font_gray};
  }
  th,
  td,
  td span {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 22px;
    text-align: left;
  }

  td > div {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    > img {
      margin-right: 8px;
    }
    .err {
      min-height: unset;
    }
  }
`;

export default AdminMarkets;
