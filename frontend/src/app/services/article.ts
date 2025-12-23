import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Article} from '../models/article.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${environment.apiUrl}api/articles`);
  }

  getArticleById(id: string): Observable<any> {
    return this.http.get<Article>(`${environment.apiUrl}api/articles/${id}`);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${environment.apiUrl}api/articles`, article);
  }

  updateArticle(id: string, article: Article): Observable<Article> {
    return this.http.put<Article>(`${environment.apiUrl}api/articles/${id}`, article);
  }

  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}api/articles/${id}`);
  }

  publishArticle(id: string): Observable<Article> {
    return this.http.put<Article>(`${environment.apiUrl}api/articles/${id}/publish`, {});
  }
}
