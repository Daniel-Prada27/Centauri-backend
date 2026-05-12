import { AppError } from "../errors/appError";

export const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    const err = new AppError("No autorizado", 401);
    return err;
  }
  // User is logged in, proceed
  next();
}

export default requireLogin;