import { tweetsData } from './data.js'
import { v4 as uuid } from 'https://jspm.dev/uuid';
const feed = document.getElementById('feed')   





function getFeed() {
    let feedHtml = ""
    tweetsData.forEach((tweet) =>
    {
        let liked = ""
        let retweeted = ""
        let replyHTML = ""
        if (tweet.isLiked) {
            liked = "liked"
        }
        if (tweet.isRetweeted) {
            retweeted = "retweeted"
        }
        if (tweet.replies.length>0) {
        // SHOW REPLIES
        tweet.replies.forEach((reply)=>{
            replyHTML +=
            `
            <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>
            `
        })
        
        }


        feedHtml +=
`
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        
                        <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-heart ${liked}" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${retweeted}" data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
        </div>
        <div class="hidden" id="replies-${tweet.uuid}">
        ${replyHTML}
    </div>   
</div>
`
    })
    return feedHtml
}


document.addEventListener("click", (e) =>
{
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if (e.target.dataset.retweet)
    {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply) {
        handleReplies(e.target.dataset.reply)
    }
    else if (e.target.id === 'tweet-btn') {
        handleTweet()
    }
})

function handleLikeClick(tweetID)
{
    const tweet = tweetsData.filter((tweet) => {
        if (tweet.uuid === tweetID) {
            return tweet
        }
    })[0]

    if (!tweet.isLiked) {
        tweet.likes++;
        
    }
    else {
        tweet.likes--;
        
    }
    tweet.isLiked = !tweet.isLiked
    render()

}

function handleRetweetClick(tweetID)
{
    const tweet = tweetsData.filter((tweet) => {
        if (tweet.uuid === tweetID) {
            return tweet
        }
    })[0]

    if (!tweet.isRetweeted) {
        tweet.retweets++;
    }
    else {
        tweet.retweets--;
    }
    tweet.isRetweeted = !tweet.isRetweeted
    render()

}

function handleReplies(tweetID)
{
    const tweet = tweetsData.filter((tweet) => {
        if (tweet.uuid === tweetID) {
            return tweet
        }
    })[0]

    if (tweet.replies.length>0) {
        document.getElementById(`replies-${tweet.uuid}`).classList.toggle("hidden")
    }
}

function handleTweet() {
    const tweetInput = document.getElementById('tweet-input')
    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Krym`,
            profilePic: `images/krym.jpg`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuid()
        })
    render()
    tweetInput.value = ''
    }
}

function render() {
    feed.innerHTML = getFeed()
}

render()

