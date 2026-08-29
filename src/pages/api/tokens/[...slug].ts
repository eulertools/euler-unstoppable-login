import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export const TOKENS_HANDLER_URL = '/api/tokens';

interface NextApiRequestWithParams extends NextApiRequest {
  params: { [key: string]: string };
}

function onNoMatch(__req, res) {
  res.status(404).end('Page not found.. or is it');
}

export interface ITokenPriceDTO {
  _source: {
    price_usd: number;
  };
}

const handler = nc<NextApiRequestWithParams, NextApiResponse>({ attachParams: true, onNoMatch });

handler.get(`${TOKENS_HANDLER_URL}/:tokenAddress`, async (req, res) => {
  const fetchResponse = await fetch(
    `https://bsc.catalog.prod.euler.tools/tokens/${req.params.tokenAddress}?fields[]=price_usd`,
  );

  try {
    const tokenInfo = await fetchResponse.json();

    return res.json(tokenInfo);
  } catch (error) {
    console.error(error);

    return res.json({ price_usd: 0 });
  }
});

handler.get(`${TOKENS_HANDLER_URL}/bnb/price`, async (__req, res) => {
  const fetchResponse = await fetch('https://api.binance.com/api/v1/ticker/price?symbol=BNBUSDT');

  try {
    const bnbInfo = await fetchResponse.json();

    return res.json(bnbInfo);
  } catch (error) {
    console.error(error);

    return res.json({ price: 0 });
  }
});

export default handler;
