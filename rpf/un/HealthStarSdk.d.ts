type Mode = 'development' | 'prelease' | 'production';
interface Data {
  model: any;
  [key: string]: any;
}
interface MockDatas {
  [key: string]: {
    success: boolean;
    error?: {
      code: string;
      msg: string;
    };
    data?: Data;
  };
}

interface AnyObject {
  [key: string]: any;
}

declare class HealthStarSdk {
  constructor({ mode, mockDatas }: { mode?: Mode; mockDatas?: MockDatas } = {});
  private _init(mode?: Mode, mockDatas?: MockDatas): void;
  private _initMessageList(): Promise<string>;
  private _postMessage(method: string, params?: AnyObject): Promise<string>;
  private _getMessage(flag: string): Promise<Data>;
  getUserId(): Promise<string>;
  run(methodName: string, params?: AnyObject): Promise<Data>;
}
export = HealthStarSdk;
