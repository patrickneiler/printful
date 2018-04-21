export default (response) => {
  const result = response.data.result;

  if (response.data.paging) {
    return {
      data: result,
      ...response.data.paging,
    };
  }

  return result;
}
