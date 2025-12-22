import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article';
import {Article} from '../../../models/article.model';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-article.component',
  imports: [ReactiveFormsModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css',
})
export class CreateArticleComponent implements OnInit {
  success: boolean = false;
  error: string | null = null;

  isEditMode = false;
  articleId!: string;
  articleForm!: FormGroup;

  constructor(
    private articleService: ArticleService, 
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
      this.articleForm = this.fb.group({
        title: ['', Validators.required],
        body: ['', Validators.required],
        imageUrl: ['']
      });
    }
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params=>{
        this.articleId = params.get('id') || '';
        if(this.articleId){
        this.isEditMode = true;
        this.loadArticle();
        }
      });
    }

  loadArticle() {
    this.articleService.getArticleById(this.articleId).subscribe(res=>{
      const article = res.article;
      console.log('Raw Response: ', article);
      this.articleForm.patchValue({
        title: article.title,
        body: article.body,
        imageUrl: article.imageUrl
      });
      console.log('Form After: ', this.articleForm.value);
    }
    )
  }

  submit(){
    if(this.isEditMode){
      this.updateArticle();
    } else {
      this.createArticle();
    }
  }
  createArticle() {
    if(this.articleForm.invalid){
      return;
    }

    this.articleService.createArticle(this.articleForm.value).subscribe({
      next: () => {
        this.success = true;
        this.articleForm.reset();

        setTimeout(() => { 
          this.success = false; 
          this.router.navigate(['/articles']);
        }, 1500);
    
      },
      error: (err) => {
        this.error = 'Failed to create article';

        setTimeout(() => { this.error = null; }, 5000);
        console.error('Failed to create article', err);
      }
    });
  }

  updateArticle() {
    this.articleService.updateArticle(this.articleId, this.articleForm.value).subscribe(()=>{
      this.router.navigate(['/articles']);
    })
  }
}
