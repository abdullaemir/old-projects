const useUniqId = () =>
  new Date().getTime().toString(36).replace(/\D/gu, Math.random().toString()).replace(/\./gu, "").substring(0, 16);

export default useUniqId;
