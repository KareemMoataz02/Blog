import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: any = '';
  article: any = '';
  authorname: any = '';
  idAuthor: any = '';


  constructor(private act: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {

    this.id = this.act.snapshot.paramMap.get('id');
    this.data.getArticleById(this.id).subscribe(
      (res: any) => {
        this.article = res;
        this.idAuthor = res.idAuthor;
        console.log(this.idAuthor);
        this.data.getAuthorFullName(this.idAuthor
        ).subscribe(
          (res: any) => {
            this.authorname = res.name + " " + res.lastname;
            console.log(this.authorname);
            catchError(() => of({ name: '', lastname: '' }))
          }
        )
      }
    )
  }
}
