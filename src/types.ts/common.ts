type RejectCallback = (arg0: NodeJS.ErrnoException) => void;
type ResolveCallback = (arg0: unknown) => void;
type ErrorMessage = {
  status: number;
  statusText: string;
  message: string;
  error: {
    errno: number;
    call: string;
    code: string;
    message: string;
  };
};

type ErrorDetail = {
  code: number;
  errno: number;
  path: string;
  syscall: string;
  message: string;
  stack: string;
};

export { RejectCallback, ResolveCallback, ErrorMessage, ErrorDetail };
