import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, IonInput } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-collection-plan',
  templateUrl: './collection-plan.page.html',
  styleUrls: ['./collection-plan.page.scss'],
  standalone: false
})
export class CollectionPlanPage implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private http: HttpClient
  ) {}

  @ViewChild('realDateInput', { static: false }) dateInput!: IonInput;

  // Default Date
  selectedDate = '2026-01-31';

  // API Data
  visits: any[] = [];

  // Filter
  showFilter = false;
  filterValue = 'All';

  // =============================
  // On Page Load
  // =============================
  ngOnInit() {
    this.loadVisits();
  }

  // =============================
  // Open Native Date Picker
  // =============================
  async openDatePicker() {
    const inputEl = await this.dateInput.getInputElement();
    inputEl.showPicker();
  }

  // =============================
  // Date Format (UI)
  // =============================
  get formattedDate(): string {

    if (!this.selectedDate) return '';

    const d = new Date(this.selectedDate);

    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = d.getFullYear();

    return `${dd}/${mm}/${yy}`;
  }

  // =============================
  // When Date Changes
  // =============================
  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    this.loadVisits();
  }

  // =============================
  // Load Data from API
  // =============================
  loadVisits() {

    const apiUrl =
      `https://ars-steels-app-0fd20ff3663d.herokuapp.com/api/fieldSales/getEmpCollectionList?date=${this.selectedDate}`;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBJZCI6ImEwMkMxMDAwMDA2d0ZiSklBVSIsInVzZXJuYW1lIjoiQVJTVEVTVDAwMyIsInNlc3Npb25JZCI6IjZiYzAzYjdiLTdkMzUtNDVhMi1iN2EwLWY1YjYwNzA5YjA1NCIsImlhdCI6MTc2OTg2NTQ5MSwiZXhwIjoxNzY5OTUxODkxfQ.dRFKRgMtlGH8YIGw8BGjSP0BZJIk_MuiouRWCaG7gqY";

    this.http.get<any>(apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).subscribe({

      next: (res) => {

        console.log('API Response:', res);

        // Map API Response to UI Format
        this.visits = (res.collectionPlanList || []).map((item: any) => {

          return {

            name: item.empname,
            address: item.address,
            person: item.contactperson,
            phone: item.contactnumber,

            // Amount (prefer collected, else estimated)
            amount: item.collectedamount || item.estimatedamount || 0,

            // Status
            status: item.collectionstatus ?? 'Pending',

            // Check-in (not from API yet)
            checkin: null

          };

        });

      },

      error: (err) => {
        console.error('API Error:', err);
        alert('Failed to load collection list');
      }

    });
  }

  // =============================
  // Filter Logic
  // =============================
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  setFilter(value: string) {
    this.filterValue = value;
    this.showFilter = false;
  }

  get filteredVisits() {

    if (this.filterValue === 'All') {
      return this.visits;
    }

    return this.visits.filter(v => v.status === this.filterValue);
  }

  // =============================
  // Badge Color
  // =============================
  getStatusClass(status: string) {

    switch (status) {

      case 'Completed':
        return 'badge-completed';

      case 'In Progress':
        return 'badge-progress';

      case 'Pending':
        return 'badge-pending';

      default:
        return 'badge-pending';
    }
  }

  // =============================
  // Card Color
  // =============================
  getCardClass(status: string) {

    return {
      'card-completed': status === 'Completed',
      'card-progress': status === 'In Progress',
      'card-pending': status === 'Pending'
    };
  }

}
