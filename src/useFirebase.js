import firebase from 'firebase';
import { useState, useEffect } from 'react';

export default function useFirebase(refName) {
  const [state, setState] = useState(null);

  const ref = firebase.database().ref(refName);

  useEffect(
    () => {
      let handleUpdate = snapshot => {
        setState(snapshot.val());
      };

      ref.on('value', handleUpdate);

      return () => {
        ref.off('value', handleUpdate);
      };
    },
    [refName]
  );

  const setRef = newValue => {
    ref.set(newValue);
  };

  return [state, setRef];
}