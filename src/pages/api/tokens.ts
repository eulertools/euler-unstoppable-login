import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export const TOKENS_HANDLER_URL = '/api/tokens';

interface NextApiRequestWithParams extends NextApiRequest {
  params: { [key: string]: string };
}

const handler = nc<NextApiRequestWithParams, NextApiResponse>({ attachParams: true });

export interface ITokenPriceDTO {
  price_usd: number;
}

handler.get('/:tokenAddress', async (req, res) => {
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

handler.get('/bnb/price', async (__req, res) => {
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
