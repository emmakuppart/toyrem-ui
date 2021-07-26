import { AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'toyrem-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  form: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private renderer2: Renderer2,
              private translateService: TranslateService,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.createSmartPostWidget(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => this.createSmartPostWidget(event.lang));
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      selfServicePickup: [],
      fullName: [],
      email: [],
      phone: [],
      comment: []
    });
  }

  private createSmartPostWidget(language: string): void {
    let script = this.renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
    var smartLocation = new SmartLocation(
             {
               target_id:  "smartpost_cont0",  
               placeid_name: "place_id",
               placename_name: "place_id", 
  
               show_infotext: false,
               show_logo: false,
               show_city: false,
               show_address: false,
               show_opened: false,
               show_description: false,
               show_default: true,

               text_place:       "${this.translateService.instant('smartpost.place.label')}",
               text_default_item: "-- ${this.translateService.instant('smartpost.place.select')} --"
             }
          );
    `;
    this.renderer2.appendChild(this.document.body, script);
  }
}
