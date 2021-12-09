import ky from "ky";
import useAuth from "../components/Auth";

const useCustomKyApi = () => {
  const { token } = useAuth();

  return ky.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set("Authorization", `Bearer ${token}`);
        },
      ],
    },
  });
};

export default useCustomKyApi;
