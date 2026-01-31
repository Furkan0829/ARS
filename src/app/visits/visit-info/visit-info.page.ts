import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RescheduleVisitComponent } from '../reschedule-visit/reschedule-visit.component';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';



@Component({
  selector: 'app-visit-info',
  templateUrl: './visit-info.page.html',
  styleUrls: ['./visit-info.page.scss'],
  standalone: false
})
export class VisitInfoPage {

  visit: any;
  visitId = '';

  constructor(
    private router: Router,
    private modalCtrl: ModalController // ✅ FIX
  ) {
    const nav = this.router.getCurrentNavigation();
    this.visit = nav?.extras?.state?.['visit'];

    this.visitId = this.generateVisitId();
  }

  generateVisitId() {
    return 'V-' + Math.floor(100000 + Math.random() * 900000);
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Completed': return 'badge-completed';
      case 'In Progress': return 'badge-progress';
      case 'Pending': return 'badge-pending';
      default: return 'badge-pending';
    }
  }

  getCardClass(status: string) {
    return {
      'card-progress': status === 'In Progress',
      'card-pending': status === 'Pending',
      'card-completed': status === 'Completed'
    };
  }

  // -----------------------------
  // OPEN RESCHEDULE MODAL
  // -----------------------------
  async openReschedule() {

  const modal = await this.modalCtrl.create({
    component: RescheduleVisitComponent,

    cssClass: 'reschedule-modal', // ✅ IMPORTANT

    backdropDismiss: false,
    showBackdrop: true
  });

  await modal.present();
}

async checkOut() {

  try {

    let latitude: number;
    let longitude: number;

    // If running on Mobile (Android / iOS)
    if (Capacitor.getPlatform() !== 'web') {

      await Geolocation.requestPermissions();

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });

      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

    }
    // If running on Browser
    else {

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000
        });

      });

      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    }

    console.log('Lat:', latitude);
    console.log('Lng:', longitude);

    // Send to backend
    this.saveCheckOut(latitude, longitude);

  }
  catch (error) {

    console.error('Location Error:', error);
    alert('Please enable GPS & Location Permission');
  }
}

saveCheckOut(lat: number, lng: number) {

  const payload = {
    latitude: lat,
    longitude: lng,
    checkOutTime: new Date()
  };

  console.log('Checkout Data:', payload);

  // TODO: API call here
}



  // -----------------------------
  // RELOAD VISIT (OPTIONAL)
  // -----------------------------
  loadVisit() {
    // If you have API → reload here
    console.log('🔄 Reload visit info');
  }
}
