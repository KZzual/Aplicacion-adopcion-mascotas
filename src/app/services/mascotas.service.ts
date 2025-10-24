import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Firestore, collection, addDoc, collectionData, query, where, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { geohashForLocation } from 'geofire-common';

@Injectable({ providedIn: 'root' })
export class MascotasService {
  constructor(
    private readonly firestore: Firestore,
    private readonly storage: Storage
  ) {}

  async crearMascota(data: any, imagenFile?: File): Promise<any> {
    // Si hay coordenadas, calcular geohash para geoqueries
    if (data.ubicacion?.coordenadas) {
      const { latitud, longitud } = data.ubicacion.coordenadas;
      data.ubicacion.geohash = geohashForLocation([latitud, longitud]);
    }

    if (imagenFile) {
      const filePath = `mascotas/${Date.now()}_${imagenFile.name}`;
      const storageRef = ref(this.storage, filePath);

      // Upload file
      await uploadBytes(storageRef, imagenFile);

      // Get download URL
      const url = await getDownloadURL(storageRef);

      // Add document to Firestore
      const mascotasCollection = collection(this.firestore, 'mascotas');
      return addDoc(mascotasCollection, { ...data, imagen: url });
    } else {
      // Usar imagen por defecto
      const mascotasCollection = collection(this.firestore, 'mascotas');
      return addDoc(mascotasCollection, { ...data, imagen: data.imagen || 'assets/img/testimage.jpg' });
    }
  }  obtenerMascotas(): Observable<any[]> {
    const mascotasCollection = collection(this.firestore, 'mascotas');
    return collectionData(mascotasCollection, { idField: 'id' });
  }

  obtenerMascotasPorUsuario(usuarioId: string): Observable<any[]> {
    const mascotasCollection = collection(this.firestore, 'mascotas');
    const q = query(
      mascotasCollection,
      where('idUsuarioRegistra', '==', usuarioId),
      orderBy('fechaRegistro', 'desc')
    );
    return collectionData(q, { idField: 'id' });
  }
}
