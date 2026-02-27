// exports.requireRole = (...roles) => {
//     return (req, res, next) => {
//       if (!req.user || !roles.includes(req.user.role)) {
//         return res.status(403).json({ message: "Access denied" });
//       }
//       next();
//     };
//   };
  

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};