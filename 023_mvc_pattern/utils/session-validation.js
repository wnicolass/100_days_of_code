function getSessionErrorData({ session }, defaultValues) {
  let sessionInputData = session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      ...defaultValues,
    };
  }

  session.inputData = null;
  return sessionInputData;
}

function flashErrorsToSession({ session }, data, action) {
  session.inputData = {
    hasError: true,
    ...data,
  };

  session.save(action);
}

module.exports = {
  getSessionErrorData,
  flashErrorsToSession,
};
