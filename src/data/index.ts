import { Course } from '../types'

class CourseStorage {
  private dbName: string
  private storeName: string
  private dbVersion: number

  constructor(dbName: string, storeName: string, dbVersion: number = 1) {
    this.dbName = dbName
    this.storeName = storeName
    this.dbVersion = dbVersion
  }

  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, {
            keyPath: 'id',
            autoIncrement: true,
          })
        }
      }

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async getItems(): Promise<Course[]> {
    const db = await this.openDB()

    const { promise, resolve, reject } = Promise.withResolvers<Course[]>()

    const transaction = db.transaction(this.storeName, 'readonly')
    const store = transaction.objectStore(this.storeName)

    const request = store.getAll()

    request.onsuccess = (event) =>
      resolve((event.target as unknown as { result: Course[] }).result)

    request.onerror = () => reject(`Error adding data: ${request.error}`)

    return promise
  }

  async getItem(id: string): Promise<Course> {
    const db = await this.openDB()

    const { promise, resolve, reject } = Promise.withResolvers<Course>()

    const transaction = db.transaction(this.storeName, 'readonly')
    const store = transaction.objectStore(this.storeName)

    const request = store.get(id)

    request.onsuccess = (event) =>
      resolve((event.target as unknown as { result: Course }).result)

    request.onerror = () => reject(`Error adding data: ${request.error}`)

    return promise
  }

  async saveItem(course: Course): Promise<Course> {
    const db = await this.openDB()

    const { promise, resolve, reject } = Promise.withResolvers<Course>()

    const transaction = db.transaction(this.storeName, 'readwrite')
    const store = transaction.objectStore(this.storeName)

    const request = store.add(course)

    request.onsuccess = () => resolve(course)
    request.onerror = () => reject(`Error adding data: ${request.error}`)

    return promise
  }

  async clear(): Promise<void> {
    const db = await this.openDB()

    const { promise, resolve, reject } = Promise.withResolvers<void>()

    const transaction = db.transaction(this.storeName, 'readwrite')
    const store = transaction.objectStore(this.storeName)

    const request = store.clear()

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)

    return promise
  }
}

export const courseStorage = new CourseStorage('MyDatabase', 'CourseStore')
