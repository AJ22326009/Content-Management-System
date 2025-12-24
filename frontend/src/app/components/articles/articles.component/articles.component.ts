import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth';
import { ArticleService } from '../../../services/article/article';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-articles.component',
  imports: [DatePipe],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent implements OnInit{
  articles: any[] = [];
  loadingArticles: boolean = false;
  errorLoadingArticles: string | null = null;
  publishMessage: string = '';
  publishFailsMessage: string = '';
  deleteMessage: string = '';
  deleteFailsMessage: string = '';

  publishId: string|null = null;
  deleteId: string| null = null;

  constructor(public authService: AuthService, private articleService: ArticleService, private router: Router) {}
  ngOnInit(): void {
    this.loadArticles();
  }

  editArticle(id: string) {
    this.router.navigate(['/articles/edit', id]);
  }
  
  loadArticles() {
    this.loadingArticles = true;
    this.articleService.getArticles().subscribe({
      next: (data: any) => { this.articles = data.articles; this.loadingArticles = false; this.errorLoadingArticles = null; },
      error: err => { console.error('Failed to load articles', err); this.loadingArticles = false; this.errorLoadingArticles = 'Failed to load articles'; }
    });
  }

  togglePublish(id: string) {
    this.publishId=id;
    this.articleService.publishArticle(id).subscribe({
      next: () => {
        this.publishId = null;
        const article = this.articles.find(a => a._id === id);
        if (article) {
          article.isPublished = !article.isPublished;
        }
        this.publishMessage = article.isPublished ? 'Published successfully' : 'Unpublished successfully';

        setTimeout(() => {
          this.publishMessage = '';
        }, 3000);
      },
      error: err => {
        this.publishId = null;
        console.error('Failed to publish article', err);
        this.publishFailsMessage = 'Failed to update publish status';

        setTimeout(() => {
          this.publishFailsMessage = '';
        }, 3000);
      }
    });
  }

  deleteArticle(id: string) {
    this.deleteId=id;
    this.articleService.deleteArticle(id).subscribe({
      next: () => {
        this.deleteId = null;
        this.articles = this.articles.filter(a => a._id !== id);
        this.deleteMessage = 'Deleted successfully';

        setTimeout(() => {
          this.deleteMessage = '';
        }, 3000);
      },
      error: err => {
        this.deleteId = null;
        console.error('Failed to delete article', err);
        this.deleteFailsMessage = 'Failed to delete article';

        setTimeout(() => {
          this.deleteFailsMessage = '';
        }, 3000);
      }
    });
  }

  noPublishedArticles(): boolean {
  return this.articles.length > 0 && !this.articles.some(a => a.isPublished);
  }

  noUnpublishedArticles(): boolean {
    return this.articles.length > 0 && !this.articles.some(a => !a.isPublished);
  }
}
