import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import { ErrorDetail, ErrorMessage } from "../types.ts/common";
import HttpCode from "http-codes";

const debug = Debug("app");

const errorHelpers = {
  errorBuilder: (err: ErrorDetail): ErrorMessage => {
    return {
      status: HttpCode.INTERNAL_SERVER_ERROR,
      statusText: "Internal server error",
      message: err.message,
      error: {
        errno: err.errno,
        call: err.syscall,
        code: "INTERNAL_SERVER_ERROR",
        message: err.message,
      },
    };
  },
  logErrors: (err: ErrorDetail, request: Request, res: Response, next: NextFunction): void => {
    debug(JSON.stringify(errorHelpers.errorBuilder(err)));
    next(err);
  },
  clientErrorHandler: (err: ErrorMessage, request: Request, res: Response, next: NextFunction): void => {
    if (request.xhr) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        statusText: "Internal server error",
        message: "XmlHttpRequest error",
        error: {
          errno: 0,
          call: "XmlHttpRequest Call",
          code: "INTERNAL_SERVER_ERROR",
          message: "XmlHttpRequest error",
        },
      });
    } else {
      next(err);
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errorHandler: (err: ErrorDetail, request: Request, res: Response, next: NextFunction): void => {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json(errorHelpers.errorBuilder(err));
  },
};

export default errorHelpers;
