exports.isLoggedIn = (req, res, next) => {
  // next();
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // next()에 아무것도 넘겨주지 않는다면 에러처리 미들웨어로 가는 것이 아닌 다음 미들웨어로 간다.

    next();
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};