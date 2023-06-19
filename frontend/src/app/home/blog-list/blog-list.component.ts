import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  articles: any;
  authorNames: { [key: string]: Observable<{ name: string, lastname: string }> } = {};

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getAll().subscribe(
      (res: any) => {
        this.articles = res;
        this.loadAuthorNames(); // Call the method to load author names
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  loadAuthorNames(): void {
    this.articles.forEach((item: any) => {
      if (!this.authorNames[item.idAuthor]) {
        this.authorNames[item.idAuthor] = this.data.getAuthorFullName(item.idAuthor).pipe(
          catchError(() => of({ name: '', lastname: '' }))
        ) as Observable<{ name: string, lastname: string }>;
      }
    });
  }
}