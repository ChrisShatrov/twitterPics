// tweet.action.ts

import { Tweet } from './tweet.model';

export class AddTweet {
    static readonly type = '[Tweet] Add';

    constructor(public payload: Tweet) {}
}