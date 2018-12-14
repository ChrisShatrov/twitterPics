import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppDashboard } from './../menu/app.menu.component';
import { fetchHomeTimeline } from 'twitter-api-ts';
import * as option from 'fp-ts/lib/Option';

const CONSUMER_KEY = 'YOUR_CONSUMER_KEY';
const CONSUMER_SECRET = 'YOUR_CONSUMER_SECRET';
const TOKEN = 'YOUR_TOKEN';
const TOKEN_SECRET = 'YOUR_TOKEN_SECRET';

fetchHomeTimeline({
  oAuth: {
      consumerKey: CONSUMER_KEY,
      consumerSecret: CONSUMER_SECRET,
      token: option.some(TOKEN),
      tokenSecret: option.some(TOKEN_SECRET),
  },
  query: {
      count: option.some(50),
  },
})
    // We use fp-ts’ Task type, which is lazy. Running the task returns a
    // promise.
    .run()
    .then(response => {
        console.log(response);
        // => Either<ErrorResponse, TwitterAPITimelineResponseT>
    });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./../css/app.component.css'],
  providers: [NgbCarouselConfig] 
})

export class MyApp {
  images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);


  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 1000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
}
