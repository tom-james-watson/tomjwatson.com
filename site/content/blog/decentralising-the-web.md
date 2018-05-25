---
title: "Decentralising the web with Dat and Beaker Browser"
date: 2018-04-12
tags: [programming, python]
---

As the world becomes ever more connected and dependent on the web, the prohibitive hurdles of hosting and serving your own content become more and more problematic. Humans are fundamentally social animals and the desire to share your content with the world is universal. However, as has become glaringly obvious over the past several months, people's faith in centralised entities such as Facebook or Google to store and host your content is eroding at a pretty rapid rate. Users are desperate for a way to take back control of their data and experiences.

<!--more-->

The beauty of the internet is that anybody can create their own website and develop their own personal corner of self-expression. Unfortunately, the technical and monetary costs prevent 99% of regular folk from being able to do this. Developing a website is difficult. Buying a domain is expensive. Setting up hosting is expensive and complicated. The distributed web aims to remove these hurdles and put the control of your content back into your own hands.

There are multiple contending approaches for how this can happen including, but not limited to, [IPFS](https://ipfs.io), [Scuttlebutt](https://www.scuttlebutt.nz) and [Dat](https://datproject.org/). The existence of multiple large projects is a sign of the level of development in the space and is far from a problem - the various implementations can happily coexist, with each coming with its own advantages and disadvantages.

I think that these technologies will not end up being visible to end users, but instead will power new technologies and applications that empower users to share and access content without a dependency on a centralised key holder.

Comparing the various offerings would be the subject of its own blog post, so for now I'll just be focussing on Dat.

## How Dat works

Dat works by converting a folder of files into an archive called a *dat*. A dat can then by synced over the internet, or even offline on a local network, copying the files to a new computer and keeping them in sync. The owner of the second computer can then choose to "seed" said dat, adding itself as a peer from which the content can now also be downloaded. In this way the dat becomes available on a peer-to-peer network with no single centralised system necessary to keep the data online. No servers. No gatekeepers. A more detailed explanation of how Dat works can be found [here](https://docs.datproject.org/concepts).

Das are addressed by a unique URL, for example:
```
dat://ff34725120b2f3c5bd5028e4f61d14a45a22af48a7b12126d5d588becde88a93
```
Dat URLs are similar to web URLs but with an important difference. Web URLs typically point to a server, which can go offline or disappear. Dat URLs point to a piece of content, regardless of where it is hosted. If any reachable host on the network is sharing the dat you are searching for, you can download the data.

## Making the p2p web usable

Dat itself is actually a protocol and realistically users are not going to be using Dat directly. However, some amazing work has been done on [Beaker Browser](https://beakerbrowser.com), which makes the distributed web a user-friendly reality that you can use today. Using the power of Dat, Beaker allows users to access Dats and load them as websites. For example, I share this website itself as a dat and this page can be viewed via Beaker at:

dat://8ad5c2265d6c66629604db1a3389e977c1c2b2f61e43b8b32db4d2ff1d15e348/blog/deploying-a-modern-static-site/.

![This website in Beaker](/images/blog/dat_url.png)

You can also choose to seed a Dat directly from the browser itself, adding your computer as a peer on the network. Most importantly, you can also create and host an entire website directly from the browser itself.

![Beaker New Site Flow](/images/blog/beaker_new_site.png)

![Beaker Created Site](/images/blog/beaker_created_site.png)

You can then share the Dat URL with your friends and have them view/seed the content from their own computers. This is an absolute game changer. Never before has it been so easy to create and host content from your own computer.

## Keeping things practical

Let's be honest - dat URLs aren't the most memorable of addresses, so you'll be happy to hear that you can still use domain names on the distributed web. Beaker will look for a `/.well-known/dat` on your web server that should contain the dat URL you wish your domain to resolve to. So, by just adding a single file to my existing HTTP web server, I made my distributed website available at dat://tomjwatson.com.

![tomjwatson.com in Beaker](/images/blog/dat_tomjwatson.png)

Also, given that you cannot yet guarantee that enough people are going to be seeding your websites to keep it online even if you turn your computer off, you'll either want to setup a server that pins all of your dats, or simply head to https://hashbase.io, where you can pin up to 100mb of your dats for free.

## Conclusion

These are still early days for Dat and Beaker and there are plenty of things that need more work, such as multi-writer dats, key management, and usability improvements to the browser. The team behind the technologies are doing fantastic work and I'm sure such things will be ironed out and improved with time.

Beaker truly embodies the spirit of the web as an open platform and I am super excited to see where its development will take us. I don't think Beaker itself will ever actually become a popular application, I see it more as a testing ground and a stepping stone towards the integration of distributed web protocols and technology into more mainstream web applications and browsers. The best we can hope for is for Beaker to develop itself into irrelevance.
