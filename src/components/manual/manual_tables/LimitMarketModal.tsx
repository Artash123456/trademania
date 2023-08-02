import { FC } from 'react';
import { openModal } from 'redux/actions/other_actions';
import styled from 'styled-components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { Form, Formik } from 'formik';
import { fetchLimitForm } from 'redux/actions/manual_actions';
import { ButtonGroup, Input } from 'components';
import { MarketAsProps } from 'types';
const LimitMarketModal: FC<MarketAsProps> = ({ market }) => {
  const dispatch = useAppDispatch();
  const { limitMarketModal, limit_market } = useAppSelector(
    ({ manual, loading }) => ({
      limitMarketModal: manual.limitMarketModal,
      limit_market: loading.limit_market,
    })
  );

  return (
    <Formik
      onSubmit={(values, { resetForm }) => {
        dispatch(
          fetchLimitForm({ data: values, resetForm, market: market.name })
        ).then(() => {
          dispatch(openModal('manual_limit_market'));
        });
      }}
      enableReinitialize
      initialValues={{
        price: 0,
        qty: '',
        order_type: limitMarketModal?.type,
        symbol: limitMarketModal?.data?.symbol,
        quote:
          limitMarketModal?.data?.quote || limitMarketModal?.data?.currency,
        side: limitMarketModal?.data?.side === 'Sell' ? 'Buy' : 'Sell',
        post_only: false,
        market: market.id,
        is_close: true,
        currency: limitMarketModal?.data?.currency,
      }}
    >
      {({ errors, touched, handleSubmit }) => (
        <StyledLimitMarket>
          <h2>Close position by {limitMarketModal.type}</h2>
          {limitMarketModal.type === 'Limit' && (
            <Input
              label={translation('limit_price')}
              type="number"
              name="price"
              errors={errors.price && touched.price ? errors.price : ''}
            />
          )}
          <Input
            label={translation('quantity')}
            name="qty"
            type="number"
            errors={errors.qty && touched.qty ? errors.qty : ''}
          />
          <ButtonGroup
            cancel_text="Cancel"
            text="confirm"
            onBack={() => dispatch(openModal('manual_limit_market'))}
            onFurther={() => handleSubmit()}
            disabled={limit_market}
          />
        </StyledLimitMarket>
      )}
    </Formik>
  );
};

const StyledLimitMarket = styled(Form)`
  background-color: ${({ theme }) => theme.background_color};
  padding: 1rem 24px 24px;
  border-radius: 8px;
  min-width: 450px;
  h2 {
    margin: 0 0 24px;
  }
`;
export default LimitMarketModal;
