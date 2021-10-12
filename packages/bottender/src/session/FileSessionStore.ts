import os from 'os';

import JFSStore, { Instance } from 'jfs';
import isBefore from 'date-fns/isBefore';
import subMinutes from 'date-fns/subMinutes';
import { Session, SessionStore } from '@bottender/core';

type FileOption =
  | string
  | {
      dirname?: string;
    };

function getDirname(arg: FileOption): string | undefined {
  if (typeof arg === 'string') {
    return arg;
  }

  if (typeof arg === 'object') {
    return arg.dirname;
  }
}

export default class FileSessionStore implements SessionStore {
  private jfs: Instance<Record<string, Session>>;

  // The number of minutes to store the data in the session.
  private expiresIn: number;

  /**
   * Create a file-based session store.
   *
   * @param arg - the file options
   * @param expiresIn - the number of minutes to store the data in the session
   */
  constructor(arg: FileOption, expiresIn?: number) {
    this.expiresIn = expiresIn ?? 0;

    const dirname = getDirname(arg) ?? '.sessions';

    const jfs = new JFSStore<Record<string, Session>>(dirname);

    this.jfs = jfs;
  }

  /**
   * Initialize the session store.
   *
   * @returns the session store
   */
  public async init(): Promise<FileSessionStore> {
    return this;
  }

  /**
   * Read the session data from the session storage, and returns the results.
   *
   * @param key - session key
   * @returns the session data or undefined
   */
  public async read(key: string): Promise<Session | undefined> {
    const safeKey = os.platform() === 'win32' ? key.replace(':', '@') : key;

    const session: Session | undefined = await new Promise(
      (resolve, reject) => {
        this.jfs.get(safeKey, (err, obj) => {
          if (err) {
            reject(err);
          } else {
            resolve(obj);
          }
        });
      }
    );

    if (session && this.expired(session)) {
      return;
    }

    return session;
  }

  /**
   * Get all of the session data.
   *
   * @returns all of the session data
   */
  public all(): Promise<Session[]> {
    return new Promise((resolve, reject) => {
      this.jfs.all((err, objs) => {
        if (err) {
          reject(err);
        } else {
          resolve(objs ? Object.values(objs) : []);
        }
      });
    });
  }

  /**
   * Replace the given session attributes entirely.
   *
   * @param key - session key
   * @param sess - the session attributes
   */
  public async write(key: string, sess: Session): Promise<void> {
    const safeKey = os.platform() === 'win32' ? key.replace(':', '@') : key;

    sess.lastActivity = Date.now();

    await new Promise<void>((resolve, reject) => {
      this.jfs.save(safeKey, sess, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Remove an item from the session storage.
   *
   * @param key - session key
   */
  public async destroy(key: string): Promise<void> {
    const safeKey = os.platform() === 'win32' ? key.replace(':', '@') : key;

    return new Promise((resolve, reject) => {
      this.jfs.delete(safeKey, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public getJFS(): Instance<Record<string, Session>> {
    return this.jfs;
  }

  private expired(sess: Session): boolean {
    if (!this.expiresIn) {
      return false;
    }

    return (
      sess.lastActivity !== undefined &&
      isBefore(sess.lastActivity, subMinutes(Date.now(), this.expiresIn))
    );
  }
}
