import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  modalOpen: boolean = false;
  email: string = '';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }



  openModal(): void {
    this.modalOpen = true;
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.modal'), 'display', 'block');
  }

  closeModal(): void {
    this.modalOpen = false;
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.modal'), 'display', 'none');
  }
}
