import { DateC, translation, useAppSelector } from 'context';

const CashFlowBotInfoModal = () => {
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
        <span>Size</span>
        <span>{botInfoModal.position_data.size}</span>
      </div>
      <div>
        <span>{translation('reinvest_bot')}</span>
        <span>{botInfoModal.reinvest ? 'enabled' : 'disabled'}</span>
      </div>
      <div>
        <span>{translation('invested_capital')}</span>
        <span>{botInfoModal.amount}</span>
      </div>
      <div>
        <span>Created At</span>
        <span>{DateC.DateMYD(botInfoModal?.created_at)}</span>
      </div>

      <div>
        <span>{translation('realised_pnl')}</span>
        <span>
          {botInfoModal?.position_data?.realised_pnl
            ? Number(botInfoModal?.position_data?.realised_pnl).toFixed(8)
            : '--'}
        </span>
      </div>
      <div>
        <span>{translation('unrealised_pnl')}</span>
        <span>
          {botInfoModal?.position_data?.unrealised_pnl
            ? Number(botInfoModal?.position_data?.unrealised_pnl)?.toFixed(8)
            : '--'}
        </span>
      </div>
      <div>
        <span>{translation('realised_pnl')} USD</span>
        <span>
          {botInfoModal?.position_data?.realised_pnl_usd
            ? Number(botInfoModal?.position_data?.realised_pnl_usd)?.toFixed(4)
            : '--'}
        </span>
      </div>
      <div>
        <span>{translation('unrealised_pnl')} USD</span>
        <span>
          {botInfoModal?.position_data?.unrealised_pnl_usd
            ? Number(botInfoModal?.position_data?.unrealised_pnl_usd)?.toFixed(
                4
              )
            : '--'}
        </span>
      </div>
      <div>
        <span>{translation('active_days')}</span>
        <span>
          <td>{DateC.CountDate(botInfoModal.created_at)}</td>
        </span>
      </div>
      <div>
        <span>{translation('profit')}</span>
        <span>
          {botInfoModal?.position_data?.difference
            ? botInfoModal?.position_data?.difference
            : '--'}
        </span>
      </div>
    </>
  );
};

export default CashFlowBotInfoModal;
