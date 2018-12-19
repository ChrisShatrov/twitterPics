// tweet.state.ts

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Followers } from './followers';
import { AddTweet } from './tweet.action';

export class FollowersStateModel {
    tweets: Followers[];
}

@State<FollowersStateModel>({
    name: 'tweets',
    defaults: {
        tweets: []
    }
})
export class TweetState {

    @Selector()
    static getTweets(state: FollowersStateModel) {
        return state.tweets;
    }

    @Action(AddTweet)
    add({getState, setState }: StateContext<FollowersStateModel>, { payload }: AddTweet) {
        const state = getState();
        setState({
            tweets: [payload]
        });
    }
}