import { randomUUID } from 'node:crypto';

/**
 * Every response carries the request id and the resolved locale. The mobile
 * client sends `x-client-locale`; when it is absent we fall back to `en`.
 */
export function requestContext(req, res, next) {
  req.id = req.get('x-request-id') ?? randomUUID();
  req.locale = req.get('x-client-locale') ?? 'en';

  res.set('x-request-id', req.id);
  res.set('content-language', req.locale);
  next();
}
