import jwt from 'jsonwebtoken';
import User from '../model/user.js';

// Function to parse cookies into an object
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

// Middleware to protect routes that require login
export const requiresLogin = async (req, res, next) => {
  try {
    const { cookie } = req.headers;
    if (!cookie) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized Access: Token not provided',
      });
    }

    const { authToken } = parseCookie(cookie);

    if (!authToken) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized Access: Token not provided',
      });
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({
      success: false,
      message: 'Unauthorized Access: Invalid Token',
    });
  }
};

// Function to get user ID from the JWT token in cookies
export const getUserId = (req) => {
  try {
    const { cookie } = req.headers;
    if (!cookie) return null;

    const { authToken } = parseCookie(cookie);

    if (!authToken) return null;

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};
