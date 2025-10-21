import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface UserProfileData {
  fullName: string;
  phone: string;
  email: string;
  createdAt?: any;
  updatedAt?: any;
}

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private readonly db: Firestore) {}

  async saveProfile(uid: string, data: UserProfileData) {
    const ref = doc(this.db, 'users', uid);
    const payload: UserProfileData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(ref, payload, { merge: true });
  }
}
