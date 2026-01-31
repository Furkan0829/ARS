import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-visit-form',
  templateUrl: './new-visit-form.component.html',
  styleUrls: ['./new-visit-form.component.scss'],
  standalone: false
})
export class NewVisitFormComponent {

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
}

