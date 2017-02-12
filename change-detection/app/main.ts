import {bootstrap} from 'angular2/platform/browser';
import {Component,ChangeDetectionStrategy} from 'angular2/core';
import {Observable, Subject} from 'rxjs/Rx';
import {Component} from 'angular2/core';

class Comment {
  text:string;
  author:string;
}

class BaseComment {
  comments = [];
  text:string;
  author:string;
  message:string;
  addComment(){
    let comment = new Comment();
    comment.text = this.text;
    comment.author = this.author;
    this.comments.push(comment);
  }
  lastUpdated(){
    return Date().toString();
  }
}

@Component({
    templateUrl: './app/main.html',
    selector: 'comment-section-1',
    changeDetection: ChangeDetectionStrategy.OnPush
})
class CommentSection1 extends BaseComment{
  constructor(){
    super();
    this.message = 'Using ChangeDetectionStrategy.OnPush';
  }
}

@Component({
    templateUrl: './app/main.html',
    selector:'comment-section-2',
    changeDetection: ChangeDetectionStrategy.Default
})
class CommentSection2 extends BaseComment{
  constructor(){
    super();
    this.message = 'Using ChangeDetectionStrategy.Default';
  }
}

@Component({
  selector: 'main-app',
  template: `
      <comment-section-1></comment-section-1>
      <comment-section-2></comment-section-2>
  `,
  directives: [CommentSection1, CommentSection2]
})
export class MainComponent {
}

bootstrap(MainComponent);
