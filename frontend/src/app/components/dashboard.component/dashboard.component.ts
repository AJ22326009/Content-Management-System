import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { ArticleService } from '../../services/article/article';

@Component({
  selector: 'app-dashboard.component',
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  publishedArticlesCount = 0;
  draftArticlesCount = 0;

  constructor(public authService: AuthService, private articleService: ArticleService) {
    this.countPublishedAndDraftArticles();
   }

  countPublishedAndDraftArticles() {
    this.articleService.getArticles().subscribe((data: any) => {
      const articles: any[] = data.articles;
      this.publishedArticlesCount = articles.filter(article => article.isPublished).length;
      this.draftArticlesCount = articles.filter(article => !article.isPublished).length;
    });
  }
}
