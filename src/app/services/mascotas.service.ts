import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MascotasService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  crearMascota(data: any, imagenFile?: File): Promise<any> {
    if (imagenFile) {
      const filePath = `mascotas/${Date.now()}_${imagenFile.name}`;
      const ref = this.storage.ref(filePath);
      return this.storage.upload(filePath, imagenFile)
        .then(() => ref.getDownloadURL().toPromise())
        .then(url => {
          return this.firestore.collection('mascotas').add({ ...data, imagen: url });
        });
    } else {
      // Usar imagen por defecto
      return this.firestore.collection('mascotas').add({ ...data, imagen: data.imagen || 'assets/img/testimage.jpg' });
    }
  }

  obtenerMascotas(): Observable<any[]> {
    return this.firestore.collection('mascotas').valueChanges({ idField: 'id' });
  }
}
