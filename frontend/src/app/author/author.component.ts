import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  id: any;
  author: any;
  articles: any;
  count: any; // Add count variable

  constructor(private act: ActivatedRoute, private _auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');
    console.log(this.id);

    this._auth.getById(this.id).subscribe(
      (res: any) => {
        this.author = res;
      },
    )

    this.data.getArticleByIdAuthor(this.id).subscribe(
      (res: any) => {
        this.articles = res;
        this.count = this.articles.length; // Assign count value
        console.log(this.articles);

      },
      (err: any) => {
        console.log(err);
      },
    )
  }
}
