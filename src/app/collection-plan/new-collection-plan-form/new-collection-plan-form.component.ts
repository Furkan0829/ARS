import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-collection-plan-form',
  templateUrl: './new-collection-plan-form.component.html',
  styleUrls: ['./new-collection-plan-form.component.scss'],
  standalone: false
})
export class NewCollectionPlanFormComponent  implements OnInit {


  httpClient = inject(HttpClient);

  data: any[] = [];

  constructor() { }

  ngOnInit() {}


  fetchData() {
    this.httpClient.get('https://orgfarm-55be5b4cd7-dev-ed.develop.my.salesforce.com/services/apexrest/DMS_DispatchOrder/801fj00000eSnV1AAK')
      .subscribe(response => {
        console.log(response);
        this.data = response as any[];
      });
    }

}
