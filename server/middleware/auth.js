import jwt from 'jsonwebtoken';
import User from '../model/user.js';

const parseCookie = (cookieString) => {
  if (!cookieString || cookieString.length < 1) return {};
  return cookieString
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
};
export const requiresLogin = async (req, res, next) => {
  try {
    console.log(req.headers);
    if(!req.headers.cookie) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized Access: Token not provided',
      });
    }

    const token = parseCookie(req.headers.cookie).authToken
    //console.log(token);
    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized Access: Token not provided',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("verified");
    req.user = decoded;
    //console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: 'Unauthorized Access: Invalid Token',
    });
  }
};

export const getUserId = (req) => {
  const cookies = parseCookie(req.headers.cookie)
  const decoded = jwt.verify(cookies.authToken, process.env.JWT_SECRET);
  //console.log(decoded.userId);
  return decoded.userId;
};