

export class HttpError extends Error {
  public status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}


export interface ApiResponse<T = null>{
  success: boolean;
  message?: string;
  error?:string
  data?: T
}