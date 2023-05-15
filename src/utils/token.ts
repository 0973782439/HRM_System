const getAccesTokenLST = () => localStorage.getItem("token") || "";
const clearAccesTokenLST = () => localStorage.removeItem("token");
const setAccesTokenLST = (token: string) =>
  localStorage.setItem("token", token);
export { getAccesTokenLST, clearAccesTokenLST, setAccesTokenLST };
