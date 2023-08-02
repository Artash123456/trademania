import { Button, Input, Switch, WarningContent } from 'components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { Form, Formik } from 'formik';
import { RiErrorWarningFill } from 'react-icons/ri';
import { openModal } from 'redux/actions/other_actions';
import {
  changeNameEmail,
  saveDiscordId,
  saveTradingViewName,
} from 'redux/actions/settings_actions';
import { emailValidation } from 'validations';
import { changeTheme } from 'redux/reducers/styles';
import { changeUsingMode } from 'redux/actions/market_actions';
import { IoMdWarning } from 'react-icons/io';

const UpdateProfileDetails = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(({ styles }) => styles);
  const { tradingview_name_loading, save_discord_id_loading } = useAppSelector(
    ({ loading }) => loading
  );
  const { isDemo, storeMarkets } = useAppSelector(({ markets }) => markets);
  const { data } = useAppSelector(({ user }) => user);
  return (
    <Formik
      enableReinitialize
      onSubmit={(values, { setErrors }) =>
        dispatch(changeNameEmail({ values, id: data.id, setErrors }))
      }
      initialValues={{
        first_name: data?.first_name || '',
        last_name: data?.last_name || '',
        email: data?.email || '',
        tradingview_name: data.tradingview_name || '',
        discord_id: data.discord_id || '',
        tron_private_key: data.tron_private_key || '',
      }}
      validationSchema={emailValidation}
    >
      {({ errors, touched, values }) => (
        <Form>
          <Input
            name="first_name"
            label={translation('first_name')}
            placeholder=""
            errors={errors ? errors.first_name : ''}
            touched={touched ? touched.first_name : ''}
          />
          <Input
            name="last_name"
            label={translation('last_name')}
            placeholder=""
            errors={errors ? errors.last_name : ''}
            touched={touched ? touched.last_name : false}
          />
          <Input
            name="email"
            label={translation('email')}
            placeholder=""
            errors={errors ? errors.email : ''}
            touched={touched ? touched.email : ''}
          />
          <div className="hr" />
          <div className="select-theme">
            <span>Theme</span>
            <label className="flac">
              {theme === 'dark_mode' ? 'Darkmode' : 'Lightmode'}
              <Switch
                onChange={() => dispatch(changeTheme())}
                checked={theme === 'dark_mode'}
                width={37}
                height={22}
              />
            </label>{' '}
          </div>
          <div className="select-theme">
            <span>Data mode</span>
            <label className="flac">
              {isDemo ? 'Demo vizualization' : 'Live vizualization'}
              <Switch
                onChange={() => dispatch(changeUsingMode(isDemo, storeMarkets))}
                checked={isDemo}
                width={37}
                height={22}
              />
            </label>{' '}
          </div>
          <div className="hr" />
          <h3>Trading view</h3>
          <h4>Please enter your Trading view name</h4>
          <Input label="Tradingview Username" name="tradingview_name">
            <span className="input-save-btn">
              <Button.Blue
                disabled={tradingview_name_loading}
                onClick={() =>
                  dispatch(
                    saveTradingViewName({
                      tradingview_name: values.tradingview_name,
                    })
                  )
                }
              >
                Save
              </Button.Blue>
            </span>
          </Input>
          <div className="hr" />
          <h3>Discord community</h3>
          <h4>Please enter your Discord ID</h4>
          <Input label="Discord id" placeholder="" name="discord_id">
            <span className="input-save-btn">
              <Button.Blue
                disabled={save_discord_id_loading}
                onClick={() =>
                  dispatch(saveDiscordId({ discord_id: values.discord_id }))
                }
              >
                Save
              </Button.Blue>
            </span>
          </Input>
          <div className="warning">
            <RiErrorWarningFill /> Please note that before filling out this
            field, you must accept the invitation we have sent you.
          </div>
          <div className="hr" />
          <h3>Delete account</h3>
          <h4>Permanently delete your account.</h4>
          <WarningContent
            heading="Warning - deleting account"
            paragraph={translation('set_11_paragraph')}
          >
            <Button.Green
              onClick={() => dispatch(openModal('delete_account'))}
              style={{ marginLeft: 'auto' }}
              value="delete_account"
              error
              type="button"
            >
              <IoMdWarning size={18} />
            </Button.Green>
          </WarningContent>
          <Button.Add
            value="save_changes"
            className="save-changes-btn"
            type="submit"
          />
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProfileDetails;
