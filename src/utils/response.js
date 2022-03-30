import logger from "./logger";

export const onSuccess = (res, status_code, message, data) => {
  return res.status(status_code).json({
    status: status_code,
    message,
    data,
  });
};

export const onError = (res, status_code, error) => {
  return res.status(status_code).json({
    status: status_code,
    error,
  });
};

export const onServerError = (res, error) => {
  if (error) {
    const { name, fileName, stack } = error;
    logger.error({
      name,
      message: fileName ? `[${fileName}] ${stack}` : stack,
      fileName,
    });
  }
  const err =
    error && error.fileName
      ? {
          status: 400,
          msg: "Uploaded file doesn't meet specifications",
        }
      : { status: 500, msg: "Internal Server Error" };

  return res.status(err.status).json({
    status: err.status,
    error: err.msg,
  });
};

export const logMultipleErrors = (errors, fileName) => {
  errors.map((err) => {
    if (err) {
      logger.error({
        name: err.name,
        message: `[${fileName}] ${err.stack}`,
        fileName,
      });
    }
  });
};
