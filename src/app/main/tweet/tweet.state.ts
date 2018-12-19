// tweet.state.ts

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Tweet } from './tweet.model';
import { AddTweet } from './tweet.action';

export class TweetStateModel {
    tweets: Tweet[];
}

@State<TweetStateModel>({
    name: 'tweets',
    defaults: {
        tweets: []
    }
})
export class TweetState {

    @Selector()
    static getTweets(state: TweetStateModel) {
        return state.tweets;
    }

    @Action(AddTweet)
    add({getState, setState }: StateContext<TweetStateModel>, { payload }: AddTweet) {
        const state = getState();
        setState({
            tweets: [payload]
        });
    }
}