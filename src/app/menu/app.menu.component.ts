import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dash',
  templateUrl: './app.menu.component.html',
  styleUrls: ['./../css/app.component.css'],
})
export class AppDashboard {
  @Output() followerData = new EventEmitter<object>();
  @Output() hashtagData = new EventEmitter<object>();
  public radioGroupFormHashtags: FormGroup;
  public radioGroupFormFollowers: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.radioGroupFormHashtags = this.formBuilder.group({
      'model': '0'
    });
    this.radioGroupFormFollowers = this.formBuilder.group({
      'model': '1000'
    });
  }

  optionsFollowersChanged(followerData) {
    this.followerData.emit(followerData.target.value);
  }

  optionsHashtagsChanged(hashtagData) {
    this.hashtagData.emit(hashtagData.target.value);
  }
}