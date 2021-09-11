import axios from "axios";
import React from "react";
import { useState } from "react";
import ErrorContainer from "../components/Error/ErrorBar";

interface useRequestProps {
  url: string;
  method: "post" | "get";
  body: any;
  onSuccess: (data: any) => {};
}

function useRequest({ url, method, body, onSuccess }: useRequestProps) {
  const [errors, setErrors] = useState<JSX.Element | null>(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      setErrors(<ErrorContainer errors={err.response?.data?.errors} />);
    }
  };

  return { doRequest, errors };
}

export default useRequest;
