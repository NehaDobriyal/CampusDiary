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
    const { cookie } = req.headers;
    if (!cookie) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized Access: Token not provided',
      });
    }

    const cookies = parseCookie(cookie);
    const authToken = cookies.token; 

    if (!authToken) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized Access: Token not provided',
      });
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized Access: User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({
      success: false,
      message: 'Unauthorized Access: Invalid Token',
    });
  }
};

export const getUserId = (req) => {
  try {
    const { cookie } = req.headers;
    if (!cookie) return null;

    const cookies = parseCookie(cookie);
    const authToken = cookies.token; 

    if (!authToken) return null;

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); 
    return decoded.userId;
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};
