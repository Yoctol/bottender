import os from 'os';

import JFSStore, { Instance } from 'jfs';
import isBefore from 'date-fns/isBefore';
import subMinutes from 'date-fns/subMinutes';

import Session from './Session';
import SessionStore from './SessionStore';

type FileOption =
  | string
  | {
      dirname?: string;
    };

function getDirname(arg: FileOption): string | void {
  if (typeof arg === 'string') {
    return arg;
  }

  if (arg && typeof arg === 'object') {
    return arg.dirname;
  }
}

export default class FileSessionStore implements SessionStore {
  _jfs: Instance<Record<string, any>>;

  // The number of minutes to store the data in the session.
  _expiresIn: number;

  constructor(arg: FileOption, expiresIn?: number) {
    this._expiresIn = expiresIn || 0;

    const dirname = getDirname(arg) || '.sessions';

    const jfs = new JFSStore(dirname);

    this._jfs = jfs;
  }

  async init(): Promise<FileSessionStore> {
    return this;
  }

  async read(key: string): Promise<Session | null> {
    const safeKey = os.platform() === 'win32' ? key.replace(':', '@') : key;

    try {
      const session: Session | null = await new Promise((resolve, reject) => {
        this._jfs.get(safeKey, (err, obj) => {
          if (err) {
            reject(err);
          } else {
            resolve(obj);
          }
        });
      });

      if (session && this._expired(session)) {
        return null;
      }

      return session;
    } catch (err) {
      return null;
    }
  }

  all(): Promise<Session[]> {
    return new Promise((resolve, reject) => {
      this._jfs.all((err, objs) => {
        if (err) {
          reject(err);
        } else {
          resolve(objs as Session[]);
        }
      });
    });
  }

  async write(key: string, sess: Session): Promise<void> {
    const safeKey = os.platform() === 'win32' ? key.replace(':', '@') : key;

    sess.lastActivity = Date.now();

    await new Promise((resolve, reject) => {
      this._jfs.save(safeKey, sess, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async destroy(key: string): Promise<void> {
    const safeKey = os.platform() === 'win32' ? key.replace(':', '@') : key;

    return new Promise((resolve, reject) => {
      this._jfs.delete(safeKey, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  getJFS(): Instance<Record<string, any>> {
    return this._jfs;
  }

  _expired(sess: Session): boolean {
    if (!this._expiresIn) {
      return false;
    }

    return (
      sess.lastActivity !== undefined &&
      isBefore(sess.lastActivity, subMinutes(Date.now(), this._expiresIn))
    );
  }
}
