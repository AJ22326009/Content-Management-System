import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth';
import {Article} from '../../../models/article.model';
import { ArticleService } from '../../../services/article';

@Component({
  selector: 'app-articles.component',
  imports: [],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent implements OnInit{
  articles: Article[] = [];
  loadingArticles: boolean = false;
  errorLoadingArticles: string | null = null;

  constructor(public authService: AuthService, private articleService: ArticleService) {}
  ngOnInit(): void {
    this.loadArticles();
  }
  
  loadArticles() {
    this.loadingArticles = true;
    this.articleService.getArticles().subscribe({
      next: (data: any) => { this.articles = data.articles; this.loadingArticles = false; this.errorLoadingArticles = null; },
      error: err => { console.error('Failed to load articles', err); this.loadingArticles = false; this.errorLoadingArticles = 'Failed to load articles'; }
    });
  }

  noPublishedArticles(): boolean {
  return this.articles.length > 0 && !this.articles.some(a => a.isPublished);
  }
}
