import createCache from '@emotion/cache';

const createEmotionCache = () => createCache({ key: 'css-euler' });

export default createEmotionCache;