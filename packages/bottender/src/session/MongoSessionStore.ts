import isBefore from 'date-fns/isBefore';
import subMinutes from 'date-fns/subMinutes';
import { Collection, Db, MongoClient } from 'mongodb';
import { Session, SessionStore } from '@bottender/core';

type MongoOption =
  | string
  | {
      url?: string;
      collectionName?: string;
    };

export default class MongoSessionStore implements SessionStore {
  private url: string;

  private collectionName: string;

  // The number of minutes to store the data in the session.
  private expiresIn: number;

  private connection?: Db;

  /**
   * Create a Mongo-based session store.
   *
   * @param arg - the Mongo options
   * @param expiresIn - the number of minutes to store the data in the session
   */
  constructor(arg: MongoOption, expiresIn?: number) {
    if (typeof arg === 'string') {
      this.url = arg;
      this.collectionName = 'sessions';
    } else {
      this.url = arg.url ?? 'mongodb://localhost:27017';
      this.collectionName = arg.collectionName ?? 'sessions';
    }
    this.expiresIn = expiresIn ?? 0;
  }

  /**
   * Initialize the session store.
   *
   * @returns the session store
   */
  public async init(): Promise<MongoSessionStore> {
    this.connection = (await MongoClient.connect(this.url)).db();

    return this;
  }

  /**
   * Read the session data from the session storage, and returns the results.
   *
   * @param key - session key
   * @returns the session data or undefined
   */
  public async read(key: string): Promise<Session | undefined> {
    const session = await this.sessions.findOne({ id: key });

    if (session && this.expired(session)) {
      return;
    }

    return session ?? undefined;
  }

  /**
   * Get all of the session data.
   *
   * @returns all of the session data
   */
  public async all(): Promise<Session[]> {
    return this.sessions.find().toArray();
  }

  /**
   * Replace the given session attributes entirely.
   *
   * @param key - session key
   * @param sess - the session attributes
   */
  public async write(key: string, sess: Session): Promise<void> {
    const filter = { id: key };

    sess.lastActivity = Date.now();

    await this.sessions.updateOne(
      filter,
      { $set: sess },
      {
        upsert: true,
      }
    );
  }

  /**
   * Remove an item from the session storage.
   *
   * @param key - session key
   */
  public async destroy(key: string): Promise<void> {
    await this.sessions.deleteOne({ id: key });
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

  get sessions(): Collection<Session> {
    if (this.connection == null) {
      throw new Error(
        'MongoSessionStore: must call `init` before any operation.'
      );
    }
    return this.connection.collection(this.collectionName);
  }
}
