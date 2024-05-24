type Success<T> = {
  status: "success";
  data: T;
  message?: string;
};

type Error = {
  status: "error";
  message: string;
};

export type ServerResponse<T> = Success<T> | Error;