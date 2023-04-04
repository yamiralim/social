const userData = [
    {
        username: 'larigens',
        email: 'larigens@gmail.com',
    },
    {
        username: 'hpotter',
        email: 'hpotter@hogwarts.edu',
    },
    {
        username: 'hgranger',
        email: 'hgranger@hogwarts.edu',
    },
    {
        username: 'rweasley',
        email: 'rweasley@hogwarts.edu',
    },
    {
        username: 'sblack',
        email: 'sblack@outlook.com',
    },
    {
        username: 'dobby',
        email: 'dobby@yahoo.com',
    }
]

const thoughtData = [
    {
        thoughtText: "Here's a cool thought...",
        username: "larigens",
        reactions: [
            {
                reactionBody: "Agree!",
                username: "hgranger"
            },
            {
                reactionBody: "So cool!",
                username: "sblack"
            }
        ]
    },
    {
        thoughtText: "I'm excited for the weekend!",
        username: "larigens",
        reactions: [
            {
                reactionBody: "Me too!",
                username: "dobby"
            },
            {
                reactionBody: "Can't wait!",
                username: "hpotter"
            }
        ]
    },
    {
        thoughtText: "I almost learned a new trick today!",
        username: "hpotter",
        reactions: [
            {
                reactionBody: "Call me!",
                username: "rweasley"
            }
        ]
    },
    {
        thoughtText: "Studying...",
        username: "hgranger",
        reactions: [
            {
                reactionBody: "You're so smart!",
                username: "rweasley"
            },
            {
                reactionBody: "Share your knowledge with the world Granger!",
                username: "sblack"
            }
        ]
    },
    {
        thoughtText: "It's leviosa, not leviosar!",
        username: "hgranger",
        reactions: [
            {
                reactionBody: "Agree!",
                username: "dobby"
            },
            {
                reactionBody: "So true!",
                username: "sblack"
            },
            {
                reactionBody: "HAHAHAHAHAHAH",
                username: "hpotter"
            },
            {
                reactionBody: "ok.......I got it",
                username: "rweasley"
            }
        ]
    },
    {
        thoughtText: "Percy Wouldn't Recognize A Joke If It Danced Naked In Front Of Him Wearing Dobby's Tea Cozy.",
        username: "rweasley",
        reactions: [
            {
                reactionBody: "HAHAHAHAHAHAH!",
                username: "hpotter"
            },
            {
                reactionBody: "HAHAHAHAHAHA that's hilarious!",
                username: "sblack"
            },
            {
                reactionBody: "That is not cool!",
                username: "hgranger"
            }
        ]
    },
    {
        thoughtText: "Who's down to play some Wizard chess?",
        username: "rweasley",
        reactions: [
            {
                reactionBody: "I'm down!",
                username: "hpotter"
            },
            {
                reactionBody: "Can I watch?",
                username: "dobby"
            }
        ]
    },
    {
        thoughtText: "What's Life Without A Little Risk?",
        username: "sblack",
        reactions: [
            {
                reactionBody: "Can't wait for our next adventure!",
                username: "hpotter"
            },
            {
                reactionBody: "Deep!",
                username: "hgranger"
            }
        ]
    },
    {
        thoughtText: "Dobby is freeeee",
        username: "dobby",
        reactions: [
            {
                reactionBody: "We've all known this for a while",
                username: "rweasley"
            },
            {
                reactionBody: "Dobby has no Master!!",
                username: "hpotter"
            }
        ]
    },
]

module.exports = { userData, thoughtData };
