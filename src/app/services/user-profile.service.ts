import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

export interface UserProfileData {
  fullName?: string;
  phone?: string;
  email?: string;
  birthDate?: string; // formato ISO: YYYY-MM-DD
  location?: string;
  description?: string;
  avatarUrl?: string;
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

  async updateProfile(uid: string, data: UserProfileData) {
    const ref = doc(this.db, 'users', uid);
    const payload: UserProfileData = {
      ...data,
      updatedAt: serverTimestamp(),
    };
    await setDoc(ref, payload, { merge: true });
  }

  async getProfile(uid: string): Promise<UserProfileData | null> {
    const ref = doc(this.db, 'users', uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return snap.data() as UserProfileData;
  }
}
