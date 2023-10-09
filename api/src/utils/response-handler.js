export const response = (status, data, message, res) => {
  res.status(status).send({
    payload: data,
    message,
  });
};
