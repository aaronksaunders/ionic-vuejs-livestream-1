import { ref } from "vue";

// FIREBASE
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const db = firebase
  .initializeApp({
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  })
  .firestore();

const messageCollection = db.collection("message_collection");

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
}

// data to display
export const messages = ref<any>([]);

// errors
const error = ref<any>(null);

// am i loading
export const loading = ref<any>(false);

// progress for uploading images
const progress = ref<any>(0);

// FIREBASE
const getCollectionData = async (collection: any) => {
  loading.value = true;
  try {
    const querySnapshot = await collection.get();
    const results = querySnapshot.docs.map((doc: any) => {
      return { ...doc.data(), id: doc.id };
    });
    loading.value = false;
    return results;
  } catch (e) {
    error.value = e;
    loading.value = false;
  }
};

/**
 *
 * @param collection
 * @param data
 */
const writeCollectionDoc = async (collection: any, data: any) => {
  loading.value = true;
  try {
    await collection.doc().set({ ...data }, { merge: true });
    loading.value = false;
    return true;
  } catch (e) {
    error.value = e;
    loading.value = false;
    return false;
  }
};

/**
 * delete document from firebase collection
 *
 * @param collection
 * @param id
 */
const removeCollectionDoc = async (collection: any, id: string) => {
  loading.value = true;
  try {
    await collection.doc(id).delete();
    loading.value = false;
    return true;
  } catch (e) {
    error.value = e;
    loading.value = false;
    return false;
  }
};

const getCollectionDoc = async (collection: any, id: string) => {
  loading.value = true;
  try {
    const doc = await collection.doc(id).get();
    loading.value = false;
    return { ...doc.data(), id: doc.id };
  } catch (e) {
    error.value = e;
    loading.value = false;
  }
};

export const getMessages = async () => {
  messages.value = await getCollectionData(messageCollection);
  console.log(messages.value);
};

export const addMessage = async (messageInfo: any) => {
  await writeCollectionDoc(messageCollection, messageInfo);
  await getMessages();
  return true;
};
/**
 *
 * @param id
 */
export const deleteMessage = async (id: number) => {
  await removeCollectionDoc(messageCollection, id + "");
  await getMessages();
};

/**
 *
 * @param id
 */
export const getMessage = async (id: number) => {
  await getCollectionDoc(messageCollection, id + "");
  await getMessages();
};
