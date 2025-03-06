import { Request, Response, NextFunction } from "express";

interface AsyncHandlerType {
  (req: Request, res: Response, next: NextFunction): Promise<Response>;
}

const asyncHandler = (requestHandler: AsyncHandlerType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
// const asyncHandler =
//   (fn: AsyncHandlerType) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await fn(req, res, next);
//     } catch (err) {
//       const error = err as CustomErrorHandler;
//       res.status(error?.code || 500).json({
//         success: false,
//         message: error?.message,
//       });
//     }
//   };

export { asyncHandler };
