import { useMutation } from "@vue/apollo-composable";

import userUtmSchema from "~/api/graphql/mutations/userUtm.graphql";

const useUtm = async (query) => {
  if (Object.keys(query).length) {
    const utms = Object.keys(query).reduce((data, queryParam) => {
      if (queryParam.startsWith("utm_")) {
        data[queryParam] = query[queryParam];
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
