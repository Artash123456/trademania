import { DateC, translation, useAppSelector } from 'context';

const GridBotInfoModal = () => {
  const { botInfoModal, language } = useAppSelector(({ bot, translation }) => ({
    botInfoModal: bot.botInfoModal,
    language: translation.language,
  }));

  return (
    <>
      <div>
        <span>{translation('name')}</span>
        <span>
          {botInfoModal
            ? `${botInfoModal.bot['name_' + language.toLowerCase()]}`
            : ''}
        </span>
      </div>
      <div>
        <span>Coin</span>
        <span>{botInfoModal.pair.base}</span>
      </div>
      <div>
        <span>Market</span>
        <span>{botInfoModal?.market?.name}</span>
      </div>
      <div>
        <span>Lower price</span>
        <span>{botInfoModal?.lower_price}</span>
      </div>
      <div>
        <span>Upper price</span>
        <span>{botInfoModal?.upper_price}</span>
      </div>
      <div>
        <span>Grids</span>
        <span>{botInfoModal?.grids}</span>
      </div>
      <div>
        <span>{translation('invested_capital')}</span>
        <span>{botInfoModal?.investment}</span>
      </div>
      <div>
        <span>Created At</span>
        <span>{DateC.DateMYD(botInfoModal?.created_at)}</span>
      </div>

      <div>
        <span>{translation('active_days')}</span>
        <span>{DateC.CountDate(botInfoModal.created_at)}</span>
      </div>
      <div>
        <span>Income Percent</span>
        <span>{botInfoModal.income_percent} %</span>
      </div>
    </>
  );
};
export default GridBotInfoModal;
