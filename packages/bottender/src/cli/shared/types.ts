// XXX: Maybe create a bottender-env package for common type & lib
export enum Platform {
  messenger = 'messenger',
  line = 'line',
  slack = 'slack',
  telegram = 'telegram',
  viber = 'viber',
}

export enum SessionDriver {
  memory = 'memory',
  file = 'file',
  redis = 'redis',
  mongo = 'mongo',
}

export type BottenderConfig = {
  plugins?: any[];
  session?: {
    driver: SessionDriver;
    expiresIn?: number;
    stores: {
      memory: {
        maxSize?: number;
      };
      file: {
        dirname?: string;
      };
      redis: {
        port?: number;
        host?: string;
        password?: string;
        db: number;
      };
      mongo: {
        url: string;
        collectionName?: string;
      };
    };
  };
  initialState: Record<string, any>;
  channels?: {
    [Platform.messenger]: {
      enabled: boolean;
      path: string;
      accessToken: string;
      verifyToken: string;
      appId: string;
      appSecret: string;
    };
    [Platform.line]: {
      enabled: boolean;
      path: string;
      accessToken: string;
      channelSecret: string;
    };
    [Platform.telegram]: {
      enabled: boolean;
      path: string;
      accessToken: string;
    };
    [Platform.slack]: {
      enabled: boolean;
      path: string;
      accessToken: string;
      verificationToken: string;
    };
    [Platform.viber]: {
      enabled: boolean;
      path: string;
      accessToken: string;
      sender: {
        name: string;
      };
    };
  };
};
