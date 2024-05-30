import { useMutation } from "@vue/apollo-composable";

import userUtmSchema from "~/api/graphql/mutations/setUtm.graphql";

const useUtm = async (to) => {
  const queryParams = to.query;

  if (Object.keys(queryParams).length) {
    const utms = Object.keys(queryParams).reduce((data, queryParam) => {
      if (queryParam.startsWith("utm_")) {
        data[queryParam] = queryParams[queryParam];
      }

      return data;
    }, {});

    if (Object.keys(utms).length) {
      const { mutate: sendUtm } = useMutation(userUtmSchema);

      try {
        await sendUtm(utms);
      } catch (error) {
        console.error(error);
      }
    }
  }
};

export default useUtm;
