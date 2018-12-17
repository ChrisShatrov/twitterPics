import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppDashboard } from './../menu/app.menu.component';
import * as option from 'fp-ts/lib/Option';
import { PubNubAngular } from 'pubnub-angular2';
import { AddTweet } from './tweet.action';
import { Tweet } from './tweet.model';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./../css/app.component.css'],
  providers: [NgbCarouselConfig, PubNubAngular] 
})

export class MyApp {

  //images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  tweets: Observable<Tweet>;   

  constructor(config: NgbCarouselConfig, pubnub: PubNubAngular, private store: Store) {
    config.interval = 1000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    this.tweets = this.store.select(state => state.tweets.tweets);   

    pubnub.init({
      subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
    });

    pubnub.addListener({
      message: function(message) {
        var tweetHashtags = message.message.entities.hashtags;
        //Grabbing one img per tweet for now
        if (message.message.entities.media != null) {
           var tweetImage = message.message.entities.media[0].media_url;
        }
        // if tweet has any hashtags & it contains media_url for image
        if(tweetHashtags.length > 0 && tweetImage != null) {
          console.log(message.message);
          this.store.dispatch(new AddTweet({ tweetImage}));
        }
        }
      });
      pubnub.subscribe({
        channels: ['pubnub-twitter']
      });
  }
}
