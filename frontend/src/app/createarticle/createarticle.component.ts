import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit {

  article: any = {
    title: '',
    content: '',
    tags: [],
    description: '',
  }

  tag: any = '';


  image: any;
  select(e: any) {
    this.image = e.target.files[0];
  }

  constructor(private _auth: AuthService, private data: DataService, private router: Router) { }

  ngOnInit(): void { }


  create() {
    let article = new FormData();
    article.append('title', this.article.title);
    article.append('content', this.article.content);
    article.append('tags', this.article.tags.toString());
    article.append('description', this.article.description);
    article.append('image', this.image);
    article.append('idAuthor', this._auth.getDataFromToken()._id);

    this.data.createArticle(article).subscribe(
      (res: any) => {
        this.router.navigate(['/home']);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  removeTag(index: number) {
    this.article.tags.splice(index, 1);
  }
}
