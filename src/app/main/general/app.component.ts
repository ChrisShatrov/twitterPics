import { Component, Output, EventEmitter } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppDashboard } from './../../menu/app.menu.component';
import * as option from 'fp-ts/lib/Option';
import { PubNubAngular } from 'pubnub-angular2';
import { Followers } from './selected/followers';
import { Hashtags } from './selected/hashtags';
import { Tweet } from './../selected/tweet.model';
import { Tweet } from './../tweet/tweet.model';
import { Tweet } from './../tweet/tweet.model';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./../../css/app.component.css'],
  providers: [PubNubAngular] 
})

export class MyApp {  
  tweets: Observable<Tweet>; 
  numberOfHashtags: number;
  numberOfFollowers: number;
  tweetText: string;
  tweetAuthor: string;
  tweetImage: string;
  numberOfHashtagsSelected: Observable<Followers>;
  numberOfFollowersSelected: Observable<Hashtags>;
  
  constructor(pubnub: PubNubAngular, private store: Store) {
    this.numberOfHashtagsSelected = this.store.select(state => state.numberOfHashtagsSelected.numberOfHashtagsSelected);
    this.numberOfFollowersSelected = this.store.select(state => state.numberOfFollowersSelected.numberOfFollowersSelected);
    this.tweets = this.store.select(state => state.tweets.tweets); 

    this.streamTwitter(pubnub, store, this.numberOfHashtagsSelected, this.numberOfFollowersSelected);
  }

  optionsFollowersChanged(pubnub: PubNubAngular, store: Store, followerData: number) {
    this.streamTwitter(pubnub, store, this.numberOfHashtagsSelected, this.numberOfFollowersSelected);
  }

  optionsHashtagsChanged(pubnub: PubNubAngular, store: Store, hashtagData: number) {
    this.numberOfHashtagsSelected = hashtagData;
    this.streamTwitter(pubnub, store, this.numberOfHashtagsSelected, this.numberOfFollowersSelected);
  }

  streamTwitter(pubnub, store, hashies, followies) {
    pubnub.init({
      subscribe_key: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
    });

    pubnub.addListener({
      message: function(message) {
        this.numberOfHashtags = message.message.entities.hashtags.length;
        this.numberOfFollowers = message.message.user.followers_count;
        this.tweetAuthor= message.message.user.name;
        this.tweetText= message.message.text;
        this.tweetImage = message.message.entities.media ? 
           this.tweetImage = message.message.entities.media[0].media_url : null;

           console.log(this.numberOfHashtags);
           console.log('comparing to' + hashies);
           console.log(this.numberOfFollowers);
           console.log('comparing to' + followies);
           console.log('image:' + this.tweetImage);

        if(this.tweetImage != null
           && this.numberOfHashtags != null
           && this.numberOfHashtags <= hashies
           && this.numberOfFollowers != null
           && this.numberOfFollowers <= followies) {
          console.log(message.message);
          store.dispatch(new AddTweet({ 
            tweetImage: this.tweetImage,
            tweetText: this.tweetText,
            tweetAuthor: this.tweetAuthor,
            numberOfHashtags: this.numberOfHashtags,
            numberOfFollowers: this.numberOfFollowers }));
        }
      }
    });
    pubnub.subscribe({
      channels: ['pubnub-twitter']
     });
  }
}
