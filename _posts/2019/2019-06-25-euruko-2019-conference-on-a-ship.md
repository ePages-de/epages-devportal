---
layout: post
title: Euruko 2019 - conference on a ship
date: 2019-06-25
header_image: private/euruko2019.jpeg
category: events
tags: ["ruby", "conference"]
authors: ["German"]
about_authors: ["gsanemeterio"]
---

Last week my colleague and I were in Rotterdam for the [European Ruby conference](https://euruko2019.org/){:target="_blank"}.
As I mentioned in my last [post](/blog/tech-stories/how-i-became-fond-of-ruby-on-rails-as-a-javascript-developer/), Ruby is the main language that we use in our team.
Of course we had to go there!

## Amazing city, extraordinary venue

Rotterdam is an awesome city and has so much to offer!
I'm not good with art and architecture, but I was impressed with what I could see in this amazing city.
And the port of Rotterdam is the largest in Europe!
What's more, you can reach many things without using the public transport.
From the central station to our hotel it was only a 30-minute walk.

The venue for the conference was extraordinary and an absolute highlight.
It was a ship (!) - the SS Rotterdam.

{% image_custom image="/assets/img/pages/blog/images/ssrotterdam.jpg" width="40" lightbox %}

## First day

After the registration we gathered together with the other attendees, had breakfast, and did some networking (there was also lot's of merchandising).
When it was time, we went to the ship's theatre where the talks were held.
After the organizational stuff and the sponsor's presentation the conference started.

The first speaker was the creator of Ruby [Yukihiro Matsumoto](https://github.com/matz){:target="_blank"} who talked about the future of Ruby.
He announced Ruby3 to be launched in December 2020.
The main novelty will be the static typing.
But he let us know that he personally doesn't like it because it is not **DRY** (Don't Repeat Yourself).
He's doing it as a split project to use whoever likes it.
Personally I'm going to try to persuade my team to use it 😃.

{% image_custom image="/assets/img/pages/blog/images/matz-euruko2019.jpg" width="40" lightbox %}

[Hongli Lai](https://twitter.com/honglilai){:target="_blank"} presented us in **What causes Ruby memory bloat?** his solution to the problem of memory fragmentation.
He mentioned the solution is easy, he applied at function to defragment the memory and showed an app with passed from occupy 230MB without solution to 60MB.
The solution that he presented is [Fullstaqruby](https://fullstaqruby.org){:target="_blank"}.
Even though still in beta, we should not lose sight of it.

[Torsten Schönebaum](https://twitter.com/radlepunktde){:target="_blank"} woke up my childhood in his talk **Building bricks with MRuby: A journey to MRuby on LEGO robots**.
With ruby using **mRuby** and Lego he did a robot that can type a message.

{% image_custom image="/assets/img/pages/blog/images/mruby.jpg" width="40" lightbox %}

## Second day

We started off with a list of possible cities for the next Euruko, amongst them also Melbourne.
Yes, Australia!

One talk taking my special attention that day was **Yes, I Test In Production... And So Should You**.
[Charity Majors](https://twitter.com/mipsytipsy){:target="_blank"} explained us how we can find 80% of bugs having only a 20% effort by testing in production.
She encouraged us to not be afraid about testing in production as we can find more bugs due to the production environment being different than staging.
But sure, we shouldn't test in production only.

{% image_custom image="/assets/img/pages/blog/images/realdata.jpg" width="40" lightbox %}

[Yusuke Endoh](https://twitter.com/mametter){:target="_blank"} deepened more in the topic of **Ruby3** and we were able to see how types will work.
[Jan Krutisch](https://twitter.com/halfbyte){:target="_blank"} gave us a master class of music, and he showed us how we can make music with ruby.
It was interesting and exciting at the same time.

Finally I want to highlight the last talk of the day: **The Past, Present, and Future of Rails at GitHub**.
[Eileen M. Uchitelle](https://twitter.com/eileencodes){:target="_blank"} talked about her experience on a fork of rails to have a custom feature and her odyssey to update it.
She highlighted that we need to invest in updating our apps.
If we don't do that, in the future we can have a monster such as the legendary Hydra witch - for each bug that we can solve, there're 3 more.

## Specials

Each day we had a special talk: the first day [Melanie Keatley](https://twitter.com/Keatley){:target="_blank"} showed us her owns Pokemons in her talk **It's very effective; using Pokemon to catch all code smells**.
The second day [Richard Schneeman](https://twitter.com/schneems){:target="_blank"} as [Marie Kondo](https://twitter.com/mariekondo){:target="_blank"} explained us how we can relocate the code in order to optimize our code.
In this talk he used his dotter as rabbit dubing, that was awesome.

## Lighting talks

Miriam from Stripe talked about a gem called [**Sorbet**](https://sorbet.org/){:target="_blank"} that allows us to see the normal method definitions, and how these could be integrated in our VSCode.
I swear that that was what most pleased me.
I've been trying for months that my visual works as with TypeScript.
Another incredible talk was from Norma Miller who was parsing in real time to transform every talk into text.
She talked about the machine that she uses, and in that moment more or less she typed 350000 words and had a ratio of 99.65%.
It was amazing to see how she works!
Anecdote: a volunteer tried to replace her, and she couldn't make any phrase during her talk.

## Next stop

Once all the talks were done, it was the moment to know which is the city where the nex Euruko will take place.
Helsinki won, and I'm going to say goodbye with the last words of the future organization: "Euruko is finished, but the next Euruko will be Finnish."

{% image_custom image="/assets/img/pages/blog/images/seayouhelsinki.jpg" width="40" lightbox %}
