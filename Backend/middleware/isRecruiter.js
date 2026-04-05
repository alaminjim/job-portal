const isRecruiter = (req, res, next) => {
  if (req.role !== "Recruiter") {
    return res.status(403).json({
      message: "You don't have permission to access this resource",
      success: false,
    });
  }
  next();
};

export default isRecruiter;
