import { Component } from '@angular/core';
import { ArticleService } from '../../../services/article';
import {Article} from '../../../models/article.model';
import { AuthService } from '../../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-article.component',
  imports: [FormsModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css',
})
export class CreateArticleComponent {
  title: string = '';
  body: string = '';
  imageUrl: string = '';
  success: boolean = false;
  error: string | null = null;

  constructor(private articleService: ArticleService, private authService: AuthService) {}

  createArticle() {
    const newArticle: Article = {
      title: this.title,
      body: this.body,
      imageUrl: this.imageUrl || null
    }

    this.articleService.createArticle(newArticle).subscribe({
      next: (res) => {
        this.success = true;
        setTimeout(() => { this.success = false; }, 3000);
        this.title = '';
        this.body = '';
        this.imageUrl = '';
      },
      error: (err) => {
        this.error = 'Failed to create article';

        setTimeout(() => { this.error = null; }, 5000);
        console.error('Failed to create article', err);
      }
    });
  }
}
