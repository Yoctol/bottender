import Session from './Session';

type SessionStore = {
  init(): Promise<ThisType<SessionStore>>;

  read(key: string): Promise<Session | null>;

  all(): Promise<Session[]>;

  write(key: string, sess: Session): Promise<void>;

  destroy(key: string): Promise<void>;
};

export default SessionStore;
