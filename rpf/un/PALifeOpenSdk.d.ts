interface InitConfigs {
  appId: string;
  aId: string;
  debug?: boolean;
  isProd?: boolean;
}
interface MockDatas {
  [key: string]: {
    ret: string;
    msg: string;
    data?: {
      [key: string]: any;
    };
  };
}

interface InvokeReturn {
  ret: string;
  msg: string;
  data: {
    [key: string]: any;
  };
}
interface AnyObject {
  [key: string]: any;
}

type ShareType = 'WXHY' | 'WXPYQ' | 'XLWB' | 'DX';
interface ShareConfigs {
  title?: string;
  content?: string;
  extention: string;
  imageUrl: string;
  type: '' | 'BigImage';
  shareTypes?: Array<ShareType>;
}
interface ShareSuccessRes {
  ret: string;
  msg: string;
  data: {
    type: ShareType;
    detail: string;
  };
}
type ButtonType = 'text' | 'more' | 'share' | 'customer_service';

interface ShareCodeParams {
  templateId: string;
  channel?: string;
  wordsVar?: string;
  jumpUrl: string;
  imgUrlVar?: string;
}
declare class PALifeOpenSdk {
  static useMock: boolean;
  isPARS: boolean;
  constructor(configs: InitConfigs, mockData: MockDatas);
  private _init(configs: InitConfigs): void;
  private _initPALifeOpen(): Promise<void>;
  private _initPALifeOpenH5(config?: {
    debug?: boolean;
    isProd?: boolean;
  }): Promise<void>;
  run(
    method: string,
    params: { [key: string]: any },
    useMock?: boolean
  ): Promise<any>;
  invoke(
    service: string,
    method: string,
    params: { [key: string]: any },
    option?: {
      timeout?: number;
    },
    useMock?: boolean
  ): Promise<InvokeReturn>;
  getCV(): number;
  runH5SdkMethod(method: string, ...args: Array<any>): any;
  setTitle(title: string): void;
  setRightBtn(title: string, onCallFunction: Function, type?: ButtonType);
  getOpenId(): Promise<{ openId: string; openToken: string }>;
  addRecord(params: AnyObject, timeout?: number): Promise<InvokeReturn>;
  executeUri(uri: string): Promise<any>;
  createShareCode(config: ShareCodeParams): Promise<InvokeReturn>;
  share(config: ShareConfigs): Promise<ShareSuccessRes>;
  addRecordOutApp(configs: {
    eventId: string;
    labelId: string;
    parameters: AnyObject;
  }): Promise<XMLHttpRequest>;
  openApp(link: string): Promise<void>;
  createWxShare(link: string): Promise<string>;
}
export = PALifeOpenSdk;
