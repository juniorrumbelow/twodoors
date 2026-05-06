import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

const FavouritesContext = createContext({ favouriteIds: new Set(), isFavourite: () => false, toggleFavourite: () => {} });

export function FavouritesProvider({ children }) {
  const { user } = useAuth();
  const [favouriteIds, setFavouriteIds] = useState(new Set());

  useEffect(() => {
    if (!user || !db) {
      setFavouriteIds(new Set());
      return;
    }

    const favRef = collection(db, 'users', user.uid, 'favourites');
    const unsubscribe = onSnapshot(favRef, (snapshot) => {
      setFavouriteIds(new Set(snapshot.docs.map((d) => d.id)));
    });

    return () => unsubscribe();
  }, [user]);

  const isFavourite = (propertyId) => favouriteIds.has(propertyId);

  const toggleFavourite = async (propertyId) => {
    if (!user || !db) return;
    const favDoc = doc(db, 'users', user.uid, 'favourites', propertyId);
    if (favouriteIds.has(propertyId)) {
      await deleteDoc(favDoc);
    } else {
      await setDoc(favDoc, { addedAt: serverTimestamp() });
    }
  };

  return (
    <FavouritesContext.Provider value={{ favouriteIds, isFavourite, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export const useFavourites = () => useContext(FavouritesContext);
