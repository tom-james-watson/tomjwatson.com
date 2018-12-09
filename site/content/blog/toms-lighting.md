---
title: "Raspberry Pi-powered home lighting"
date: 2017-04-29
tags: [programming, react-native, python]
---

Have a spare raspberry pi? Why not follow in my footsteps and build your own pi-powered garish multi-coloured lighting system, all controlled via a companion android app?!

<!--more-->

![Gif of lighting in action](/images/blog/lighting.gif)

Here's what you'll need:

 * Raspberry pi with LAN access
 * [Unicorn pHat RGB LED array](https://shop.pimoroni.com/products/unicorn-phat)
 * Soldering iron
 * Android phone

#### Installing your pHAT array

First you'll want to attach the pHat to your pi. This will require a bit of soldering, unfortunately.

![Phat LED array](/images/blog/phat.jpg)

The pHat comes in two pieces - simply solder them together, making sure to solder on the LED side of the board. Then simply slide the pHat onto your pi's GPIO pins, pressing firmbly to ensure they are well connected.

You can check you've installed everything correctly by trying out a few of the examples [here](https://learn.pimoroni.com/tutorial/sandyj/getting-started-with-unicorn-phat).

#### The Pi web server

Now that you have a functioning light array, we want to create a simple web server so that we can control our lights without having to use the command line. To use your pi as a web server, you'll first want to assign your pi a static IP address. My code is hardcoded to use 192.168.0.163 (because I threw this together in a few hours), but you should be able to modify my code to communicate with a different address.

To create the web server, we can use Flask to easily create a couple of endpoints that we can use to interact with the pHat. For example to set the pHat to a certain colour:

```python
@app.route("/")
def color():
    hex_color = request.args.get('color')

    red, green, blue = map(ord, hex_color.decode('hex'))

    unicorn.set_layout(unicorn.AUTO)
    unicorn.rotation(0)
    unicorn.brightness(1)
    width, height = unicorn.get_shape()

    for y in range(height):
        for x in range(width):
            unicorn.set_pixel(x, y, red, green, blue)
            unicorn.show()
            time.sleep(0.03)

    return "Success, set to " + hex_color
```

This lets us set the colour of the pHat by making a request to `http://<pi>/?color=FF0000`, for example.

You can grab the full code from https://github.com/tom-james-watson/toms-lighting-pi. Download server.py and put it in your home directory.

Ensure you have Flask and unicornhat python modules installed:
```
pip install Flask
curl https://get.pimoroni.com/unicornhat  | bash
```

You can then launch the server with:
```
sudo python server.py
```

I'd suggest adding an entry to `/etc/rc.local` to ensure the server starts every time your pi restarts. Simply add the following to the bottom of the file, just above `exit 0`:
```
sudo python /home/<YOUR USER>/server.py &
```

Note the `&` - if you don't include this then your pi will not complete its boot sequence.

You should now be able to control the colour of your pi by making a request such as:
```
http://<ip address of pi>:5000/?color=FF0000
```

#### The companion app

![Screenshot of companion app](/images/blog/tomslighting.png)

Explaining how to create a react native app is kinda out of the scope of this blog post, but for those interested, the full code and instructions for development/building the APK are available at https://github.com/tom-james-watson/toms-lighting-app.

For those who just want the app, you can download the APK [here](https://github.com/tom-james-watson/toms-lighting-app/raw/master/toms-lighting.apk). As long as your raspberry pi is assigned to 192.168.0.163 then it should work just fine!
