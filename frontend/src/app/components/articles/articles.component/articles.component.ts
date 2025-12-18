import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-articles.component',
  imports: [],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent {

  constructor(public authService: AuthService) {}
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  articles=[
    {
      title: 'First Article',
      content:this.content,
      imageLink:'https://github.com/AJ22326009/Admin-Dashboard/blob/main/src/assets/Algasim.jpg?raw=true',
      published: true
    },
    {
      title: 'second Article',
      content:this.content,
      imageLink:'https://github.com/AJ22326009/Admin-Dashboard/blob/main/src/assets/Algasim.jpg?raw=true',
      published: true
    },
    {
      title: 'Third Article',
      content:this.content,
      imageLink:'https://github.com/AJ22326009/Admin-Dashboard/blob/main/src/assets/Algasim.jpg?raw=true',
      published: false
    }
  ]
}
