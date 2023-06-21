import { Component, Renderer2, ElementRef } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  modalOpen: boolean = false;
  email: string = '';

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private data: DataService) { }

  openModal(): void {
    this.modalOpen = true;
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.modal'), 'display', 'block');
  }

  closeModal(): void {
    this.modalOpen = false;
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.modal'), 'display', 'none');
  }

  onSubmit(): void {
    const modalTitle = this.elementRef.nativeElement.querySelector('.modal-title');
    const modalBody = this.elementRef.nativeElement.querySelector('.modal-body');

    this.data.newsLetter(this.email).subscribe(
      (res: any) => {
        console.log(res);
        if (res.message === 'Email already exists') {
          this.renderer.setProperty(modalTitle, 'innerHTML', 'Email already exists');
          this.renderer.setProperty(modalBody, 'innerHTML', 'You have already subscribed to our newsletter.');
          this.openModal();
        } else {
          this.renderer.setProperty(modalTitle, 'innerHTML', 'Thank you for subscribing!');
          this.renderer.setProperty(modalBody, 'innerHTML', 'You will receive our newsletter in your email.');
          this.openModal();
        }
        // Reset email input and modal content
        this.email = '';
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
