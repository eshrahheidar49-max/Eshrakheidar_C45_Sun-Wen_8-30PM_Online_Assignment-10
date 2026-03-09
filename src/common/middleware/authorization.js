export const authorization = (roles = {}) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error("UnAuthorized");
    }
    next();
  };
};
//عندنا مشكلة => كل الايبايز هيكون ليها رولز مختلفة
//احنا معندناش role في الاسكيما لازم نعمله
//يعني ايه req.user.role:احنا قولنا قبل كدا انك علشان تكون authorization لازم تكون authontication 
//واحنا عملنا في ال authontication حطينا اليوزر في الريكوست