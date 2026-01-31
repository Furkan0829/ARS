import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { switchMap, catchError, timeout } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  private http = inject(HttpClient);
  private storage = inject(Storage);

  // 🔐 TEMP TOKEN (ONLY FOR TESTING)
  private readonly TEMP_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBJZCI6ImEwMkMxMDAwMDA2d0ZiSklBVSIsInVzZXJuYW1lIjoiQVJTVEVTVDAwMyIsInNlc3Npb25JZCI6IjZiYzAzYjdiLTdkMzUtNDVhMi1iN2EwLWY1YjYwNzA5YjA1NCIsImlhdCI6MTc2OTg2NTQ5MSwiZXhwIjoxNzY5OTUxODkxfQ.dRFKRgMtlGH8YIGw8BGjSP0BZJIk_MuiouRWCaG7gqY";
  private readonly API_URL =
    'https://ars-steels-app-0fd20ff3663d.herokuapp.com/api';

  private readonly REQUEST_TIMEOUT = 30000;

  private storageReady = false;

  constructor() {}

  // =============================
  // INIT STORAGE (ONLY ONCE)
  // =============================
  async init(): Promise<void> {

    if (this.storageReady) return;

    await this.storage.create();
    this.storageReady = true;

    const token = await this.storage.get('token');

    // 🔥 Force replace old / missing token (TEST MODE)
    if (!token || token !== this.TEMP_TOKEN) {
      console.warn('🔁 Resetting token in storage');
      await this.storage.set('token', this.TEMP_TOKEN);
    }
  }

  // =============================
  // SAVE TOKEN (LOGIN USE)
  // =============================
  async setToken(token: string): Promise<void> {
    await this.storage.set('token', token);
  }

  // =============================
  // GET TOKEN
  // =============================
  private async getToken(): Promise<string> {

    await this.init();

    const token = await this.storage.get('token');

    if (!token) {
      throw new Error('Token not found in storage');
    }

    return token;
  }

  // =============================
  // GET VISITS (QUERY PARAM)
  // =============================
  getVisits(date: string): Observable<any> {

    const url = `${this.API_URL}/fieldSales/getVisits`;

    // ✅ Proper query param
    const params = new HttpParams().set('date', date);

    return from(this.getToken()).pipe(

      switchMap((token) => {

        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        });

        console.log('📤 Visits API GET');
        console.log('➡️ URL:', url);
        console.log('➡️ Date:', date);
        console.log('➡️ Token:', token);

        return this.http.get<any>(url, { headers, params }).pipe(
          timeout(this.REQUEST_TIMEOUT)
        );
      }),

      catchError((err) => this.handleError(err))
    );
  }

  // =============================
  // ERROR HANDLER
  // =============================
  private handleError(error: any) {

    let msg = 'Something went wrong';

    if (error.name === 'TimeoutError') {
      msg = 'Request timeout';
    }
    else if (error.status === 401) {
      msg = 'Unauthorized - Invalid / Expired token';
    }
    else if (error.status === 403) {
      msg = 'Forbidden';
    }
    else if (error.status === 404) {
      msg = 'API not found';
    }
    else if (error.status === 500) {
      msg = 'Server error';
    }
    else if (error.status === 0) {
      msg = 'Network error';
    }
    else if (error.message) {
      msg = error.message;
    }

    console.error('❌ Visits API Error:', msg);
    console.error('Full Error:', error);

    return throwError(() => new Error(msg));
  }
}
