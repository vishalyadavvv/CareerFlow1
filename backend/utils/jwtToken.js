export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.status(statusCode)
     .cookie("token", token, options)
     .json({
       success: true,
       message,
       user: {
         id: user._id,
         name: user.name,
         email: user.email,
         phone: user.phone,
         role: user.role,
       },
     });
};
