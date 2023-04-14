import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvNWIU5PSkWfDOAPJSa_d1syIOQ-XPWZA",
  authDomain: "ecommerce-db-e33e6.firebaseapp.com",
  projectId: "ecommerce-db-e33e6",
  storageBucket: "ecommerce-db-e33e6.appspot.com",
  messagingSenderId: "871122191057",
  appId: "1:871122191057:web:e4692affdb9c7adb693bf0",
};

initializeApp(firebaseConfig);

const googleProvider=new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth=getAuth();
export const signInWithGooglePopup=()=> signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect=()=> signInWithRedirect(auth, googleProvider);

export const db=getFirestore();

export const addCollectionsAndDocuments=async(collectionKey,objectsToAdd)=>{
  const collectionRef=collection(db,collectionKey);
  const batch=writeBatch(db);

  objectsToAdd.forEach(async(object)=>{
    const docRef=doc(collectionRef,object.title.toLowerCase());
    batch.set(docRef,object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments=async()=>{
  const collectionRef=collection(db,'categories');
  const q=query(collectionRef);

  const querySnapshot=await getDocs(q);
  return querySnapshot.docs.map((docSnapshot)=>docSnapshot.data());
};

export const createUserDocumentFromAuth=async(
  userAuth, 
  additionalInformation={}
  )=>{
  if(!userAuth) return; 

  const userDocRef=doc(db,'users',userAuth.uid);

  const userSnapshot=await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email}=userAuth;
    const createdAt=new Date();

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error){
      console.log(error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword=async( email, password)=>{
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword=async( email, password)=>{
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser=async()=>await signOut(auth);

export const onAuthStateChangedListener=(callback)=>{
  onAuthStateChanged(auth, callback);
}
