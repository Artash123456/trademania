import logo from './trademania-logo.png';
import bg from './trademania-bg.png';
import qr from './trademania-qr.png';
import * as htmlToImage from 'html-to-image';
import { downloadImage, useAppDispatch } from 'context';
import { useEffect } from 'react';
const Image = ({ data }) => {
  const {
    side,
    symbol,
    base,
    entry_price,
    leverage,
    market_price,
    unrealize_pnl,
    realized_pnl,
    exit_price,
  } = data;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({
      type: 'LOADING',
      payload: { download_position: true },
    });

    const doc = document.getElementById('doc');
    htmlToImage.toPng(doc).then(function (dataUrl) {
      downloadImage(dataUrl, 'Trademania_' + symbol);
      dispatch({
        type: 'LOADING',
        payload: { download_position: false },
      });
    });
  }, [symbol, dispatch]);
  return (
    <div id="doc" style={{ height: '1488px', overflow: 'auto' }}>
      <div
        style={{
          maxWidth: '1000px',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div style={{ paddingTop: '117px', paddingLeft: '45px' }}>
          <img src={logo} alt="" />
          <div style={{ paddingLeft: '62px' }}>
            <h1
              style={{
                fontSize: '90px',
                color: '#6e798f',
                fontWeight: 'bold',
                marginTop: '151px',
                marginBottom: 0,
              }}
            >
              I'm on fire!
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '33px',
              }}
            >
              <p
                style={{
                  marginBottom: 0,
                  marginTop: 0,
                  fontSize: '42px',
                  color: '#6e798f',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  textTransform: 'capitalize',
                }}
              >
                {symbol}
                <span
                  style={{
                    fontSize: '31px',
                    color: '#ffffff',
                    fontWeight: '400',
                    textTransform: 'capitalize',
                  }}
                >
                  {base}-Margin
                </span>
              </p>
              <div
                style={{
                  color: '#ffffff',
                  fontWeight: 400,
                  background: side === 'Sell' ? '#d5306f' : '#30d5c8',
                  width: '89px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '5px',
                }}
              >
                <p style={{ margin: 0, fontSize: '25px' }}>
                  {side === 'Sell' ? 'Short' : 'Long'}
                </p>
              </div>
            </div>

            <p
              style={{
                fontSize: '91px',
                color:
                  (unrealize_pnl && Number(unrealize_pnl) <= 0) ||
                  (realized_pnl && Number(realized_pnl) <= 0)
                    ? '#d5306f'
                    : '#30d5c8',
                fontWeight: 'bold',
                marginTop: 0,
              }}
            >
              {unrealize_pnl
                ? `${Number(unrealize_pnl)} %`
                : realized_pnl
                ? Number(realized_pnl)?.toFixed(8)
                : ''}
            </p>
          </div>
          <div
            style={{
              paddingLeft: '62px',
              display: 'flex',
              marginTop: '132px',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                color: '#6e798f',
                fontWeight: 400,
                marginTop: 0,
              }}
            >
              {leverage && (
                <li
                  style={{
                    marginBottom: '29px',
                    fontSize: '37px',
                  }}
                >
                  Leverage
                </li>
              )}
              <li
                style={{
                  fontSize: '37px',
                  marginBottom: '29px',
                }}
              >
                {market_price
                  ? 'Current Price'
                  : exit_price
                  ? 'Exit Price'
                  : ''}
              </li>
              <li style={{ fontSize: '37px' }}>Entry Price</li>
            </ul>
            <ul
              style={{
                listStyle: 'none',

                color: '#6e798f',
                fontWeight: 'bold',
                marginTop: 0,
              }}
            >
              {leverage && (
                <li
                  style={{
                    fontSize: '54px',
                  }}
                >
                  {leverage}X
                </li>
              )}
              <li
                style={{
                  fontSize: '54px',
                }}
              >
                {market_price ? market_price : exit_price ? exit_price : ''}
              </li>
              <li style={{ fontSize: '54px' }}>{entry_price}</li>
            </ul>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            marginLeft: '23px',
            marginTop: '140px',
          }}
        >
          <img src={qr} alt="" width="250px" height="250px" />
          <div
            style={{
              textTransform: 'uppercase',
              color: '#a2adc3',
              fontWeight: 600,
              marginLeft: '52px',
            }}
          >
            <p style={{ marginBottom: 0, fontSize: '30px' }}>
              Visit our website
            </p>
            <p style={{ marginTop: 0, fontSize: '30px' }}>
              for more information:
            </p>
            <p style={{ color: 'white', fontSize: '30px' }}>
              www.trademania.io
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
