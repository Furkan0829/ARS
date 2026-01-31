import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewVisitFormComponent } from './new-visit-form/new-visit-form.component';
import { VisitsService } from './services/visits.service';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-visits',
  templateUrl: './visits.page.html',
  styleUrls: ['./visits.page.scss'],
  standalone: false
})
export class VisitsPage implements OnInit {

  @ViewChild('realDateInput', { static: false }) dateInput!: IonInput;

  selectedDate = '2026-01-31';
  visits: any[] = [];
  showFilter = false;
  filterValue = 'All';
  isLoading = false;
  errorMessage = '';

  private visitsService = inject(VisitsService);

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    await this.visitsService.init();
    this.fetchData();
  }


  // Close filter when clicking outside
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {

  const target = event.target as HTMLElement;

  const clickedInsideFilter =
    target.closest('.right-group') ||
    target.closest('.filter-dropdown');

  if (!clickedInsideFilter) {
    this.showFilter = false;
  }
}


  // -----------------------------
  // STATUS NORMALIZER
  // -----------------------------
  normalizeStatus(status: string): string {
    if (status === 'Scheduled' || status === 'Reschedule') {
      return 'Pending';
    }
    if(status === 'Planned') {
      return 'In-Progress';
    }
    return status;
  }

  // -----------------------------
  // API CALL
  // -----------------------------
  fetchData() {
    this.isLoading = true;
    this.errorMessage = '';

    this.visits = []; // Clear existing visits

    console.log('🔄 Fetching visits for:', this.selectedDate);

    this.visitsService.getVisits(this.selectedDate).subscribe({
      next: (response) => {
        console.log('✅ API Response:', response);

        // 🔥 Update date from backend response
        if (response?.date) {
          this.selectedDate = response.date.split('T')[0];
        }

        const plannedVisits = response?.plannedVisits || [];

        this.visits = plannedVisits.map((v: any) => ({
          name: v.visitname,
          address: v.address,
          status: this.normalizeStatus(v.status), // ✅ normalized
          originalStatus: v.status,               // keep backend value
          person: v.contactperson,
          phone: v.contactnumber,
          visitDate: v.visitdate,
          visitType: v.visittype,
          checkin: null,
          originalData: v
        }));

        if (this.visits.length === 0) {
          this.errorMessage = 'No visits found for the selected date.';
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Visits API Error:', err);
        this.errorMessage = err.message || 'Failed to load visits';
        this.isLoading = false;
      }
    });
  }

  // -----------------------------
  // UI HELPERS
  // -----------------------------
  async openNewVisitModal() {
    const modal = await this.modalCtrl.create({
      component: NewVisitFormComponent,
      cssClass: 'new-visit-modal'
    });
    await modal.present();
  }

  async openDatePicker() {
  console.log('🔎 openDatePicker() called');

  const inputEl = await this.dateInput.getInputElement();

  // Listen for change ONCE
  const handler = () => {
    this.selectedDate = inputEl.value;

    console.log('📅 Date selected:', this.selectedDate);

    this.fetchData();

    // Remove listener after first use
    inputEl.removeEventListener('change', handler);
  };

  inputEl.addEventListener('change', handler);

  // Open picker
  if (typeof (inputEl as any).showPicker === 'function') {
    (inputEl as any).showPicker();
  } else {
    inputEl.focus();
  }
}


  get formattedDate(): string {
    const d = new Date(this.selectedDate);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  }

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

  // 🔥 If user selects In-Progress → show Planned also
  if (this.filterValue === 'In Progress') {
    return this.visits.filter(v =>
      v.status === 'In-Progress' || v.status === 'Planned'
    );
  }

  // Normal filtering
  return this.visits.filter(v => v.status === this.filterValue);
}


  openVisit(v: any) {
    this.router.navigate(['/visit-info'], {
      state: { visit: v }
    });
  }

  // -----------------------------
  // STATUS STYLES
  // -----------------------------
  getStatusClass(status: string) {
    switch (status) {
      case 'Completed': return 'badge-completed';
      case 'In-Progress': return 'badge-progress';
      case 'Pending': return 'badge-pending';
      case 'Cancel': return 'badge-cancel';
      default: return 'badge-default';
    }
  }

  getCardClass(status: string) {
    return {
      'card-completed': status === 'Completed',
      'card-progress': status === 'In-Progress',
      'card-pending': status === 'Pending',
      'card-cancel': status === 'Cancel'
    };
  }

  onDateChange(eventOrValue: any) {
    // Support both direct value (from ngModelChange) and ionChange event
    let newDate: string | undefined;
    if (typeof eventOrValue === 'string') newDate = eventOrValue;
    else newDate = eventOrValue?.detail?.value || eventOrValue;

    if (!newDate || newDate === this.selectedDate) return;

    this.selectedDate = newDate;
    console.log('📅 Date changed from UI:', this.selectedDate);

    this.fetchData(); // 🔥 force refresh
  }


  refreshData(event?: any) {
    this.fetchData();
    event?.target.complete();
  }
}
