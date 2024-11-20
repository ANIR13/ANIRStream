import NodeCache from 'node-cache';

// Initialize cache with 10 minutes standard TTL
const cache = new NodeCache({ stdTTL: 600 });

export const cacheMiddleware = (duration) => (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  res.originalJson = res.json;
  res.json = (body) => {
    cache.set(key, body, duration);
    res.originalJson(body);
  };
  next();
};

export const clearCache = (key) => {
  if (key) {
    cache.del(key);
  } else {
    cache.flushAll();
  }
};

export default cache;