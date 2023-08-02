import { FC } from 'react';
import { translation } from 'context';
const CreateBotHeading: FC<{ activeStep: number }> = ({ activeStep }) => {
  return (
    <h2>
      {translation(
        activeStep === 1
          ? 'choose_bot'
          : activeStep === 2
          ? 'choose_exchange'
          : activeStep === 3
          ? 'select_currency_pair'
          : activeStep === 4
          ? 'choose_capital'
          : 'summary'
      )}
    </h2>
  );
};

export default CreateBotHeading;
