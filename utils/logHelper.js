function logHelper(req) {
  const log = {
    ip: req.ip,
    url: req.url,
    method: req.method,
    userAgent: req.headers["user-agent"],
    referer: req.headers["referer"],
    contentType: req.headers["content-type"],
    contentLength: req.headers["content-length"],
    authorization: req.headers["authorization"],
    requestBody: req.body,
    queryParameters: req.query,
    cookies: req.cookies,
  };

  return log;
}

module.exports = logHelper;
