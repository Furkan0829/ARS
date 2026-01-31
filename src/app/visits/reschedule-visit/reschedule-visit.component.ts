import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reschedule-visit',
  templateUrl: './reschedule-visit.component.html',
  styleUrls: ['./reschedule-visit.component.scss'],
  standalone: false
})
export class RescheduleVisitComponent {

  // Receive visit info from parent
  @Input() visit: any;

  customerName = '';
  selectedDate = '';
  remark = '';
  reason = '';


  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.visit) {
      this.customerName = this.visit.name || '';
      this.selectedDate = this.visit.visitDate?.split('T')[0] || '';
    }
  }

  // Close modal
  close() {
    this.modalCtrl.dismiss();
  }

  // Cancel
  cancel() {
    this.modalCtrl.dismiss();
  }

  // Save
  save() {

  if (!this.selectedDate || !this.remark || !this.reason) {
    alert('Please fill all required fields');
    return;
  }

  const data = {
    visitId: this.visit?.id,
    reason: this.reason,
    newDate: this.selectedDate,
    remark: this.remark
  };

  console.log('📅 Reschedule Data:', data);

  this.modalCtrl.dismiss(data);
}

}
