# Visage Challenge

Check https://peaceful-kepler-e182f2.netlify.app/

## Initial Thought Process
In full transparency, as per Visage culture. I have written this chapter before doing a single line of code on this challenge.


Before I start developing I am taking some notes here both for you, the reviewers, to understand what I thought about before coding and the challenges that I have faced.
Since Visage opts in for full transparency (I am also a pretty transparent person personally as well) I have decided to write some more details
The below sections could then evolve and live separately as [ADRs](https://github.com/joelparkerhenderson/architecture-decision-record) so there is a history on this repository for the future so they know the challenges and decisions done, the how and the why the project has evolved to where it has which tends to be THE hardest thing in software to do IMHO.

### Hosting
I dont know much hosting services that allow DBs except for heroku and it seemed from the interview I had this is what was also expected so I will be using heroku for this.

### Db
I have decided to just use postgres because from what I searched on heroku it is the de-facto recommended db and I think for this challenge this is good enough.

Schema wise I have decided to completely split the candidates data and their pdf document submission.
In practice this means I will start with at least 2 different db tables one for candidate metadata and another for PDF files.
If we decide to scale up it should be less of a pain to switch using database to store PDF files vs something more scalable like S3.

### Back-end
I am going to use Fastify, it should be faster than express and also contains a lot of community plugins. If this were real life I would probably inquire as to what is the standard
way of doing the server on Visage (express?) and go from there. Might as well learn something new here. This is one of those decisions that can impact in the long run that can be problematic but Fastify does seem like a mature piece software.
For the connection with the Db I believe sequelize is also the standard everyone uses so I will use that one.

### API first
I have also decided to create an API (for now a simple REST API). This should also give you more flexibility in the future to easily split the back-end from the front-end
since most people have a preference for one or the other. This will also make hiring and scaling this solution easier and it is something that should not be such a huge overhead.

### Front-end
Since Visage uses Vue (and I currently use Vue in my day to day work) I have decided to create the front-end in Vue.

### Repository structure
I will probably start with some simple like two folders separating the back-end code from the front-end and go from there.
This should make the migration easier if in the future we decide to split this so we can then hire more specific devs who are strong at front-end vs those who are strong at back-end.

### Local host development
I am a bit unsure if I should use docker-compose for the database instance locally to easily connect to the back-end. It tends to be a really horrible dev experience to do front-end work inside of a docker container no matter if you use volumes and what not.
Still this is something that I will probably scope out.

### Semantic commits
I will try to adhere to using semantic commits whenever possible but this will be best effort.
Im sure you are all familiar with this but I this (gist)[https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716] has some more details (check the reference section for more)

## Final Comments
In full transparency, as per Visage culture. I have written this chapter after finishing the challenge.

I had a hard time deploying to heroku due to the strict necessity of heroku to have everything in the root folder.
I tried the Procfiles, I did a couple of other things but unfortunatelly I was unsuccesful on what I wanted to achieve: the node js app deployed and serving the index.html under / GET route.

In the end I had to keep everything in the root and then use Netlify (which took me exactly 5 minutes to setup, if less) to build the static page.
This means I have a back-end app running on https://visage-challenge.herokuapp.com/ (you will just see it log errors but its working on the /api endpoints)
And the SPA site running here https://peaceful-kepler-e182f2.netlify.app/

All in all, for me this was an interesting challenge since it was my first time actually using Node.js, to be fair this is not my finest work but given all I had to learn to get things setup up at least things are working.

For this to be an actual scalable solution we would have to use S3 or something similar to store all the candidates CVs. and not use base64 to pass them by the network.
It is the simplest solution but not the best one.

I also would have liked to have a better deployment flow and spend some more time here.

Feature wise I would have liked to have implemented an edit and delete action on the cards, so when you hover you would see a pencil icon and a cross on the top right corner.
I also would have liked to have a pdf previewer but I am unsure if the base64 solution would work for this or if I would need the exact binary.

I decided to do the candidate creation in one API call to make it simpler to implement. In hindsight I believe the main point of this challenge would have been to use something like multi-part form data or octo-stream and have two separate API calls,one for the document and another for the user creation.
The only down side to this approach that I see is that users would be able to upload CVs and then close the browser tab and we would be left with an orphan cv.

There are more things that I could say but I will leave it for the technical discussion
