# Notifier
> *Simple, elegant, and smooth Notifications for your web(site| app).*

This repo lets you generate elegant notifications to the user in a simple way.

**THIS HASN'T BEEN TESTED SINCE EXTRAPOLATION. PLEASE BE PATIENT.**

## Install

This repo is intended to be installed as a **submodule** in your code. This is a design choice because you can pull this repo and modify it directly to suit your needs. You can even fork this repo for yourself and make your own changes, and maintain it for your needs.

```console
$ cd public/assets/js/
$ git submodule add https://github.com/TheBrenny/notifier
Cloning into 'notifier'...
remote: Counting objects: 11, done.
remote: Compressing objects: 100% (10/10), done.
remote: Total 11 (delta 0), reused 11 (delta 0)
Unpacking objects: 100% (11/11), done.
Checking connectivity... done.
```

## Usage

```html
<script src="./assets/js/notifier.js"></script>
<link rel="stylesheet" href="./assets/css/notifier.css">
<script>
    notifier.notify("This is an info message");
    notifier.notify("This is an info message", "info");
    notifier.notify("This is a success message", "success");
    notifier.notify("This is a warning message", "warning");
    notifier.notify("This is an error message", "error");
    
    // Actions coming soon
</script>
```

Oh, that's neat! Can I customise the colours and stuff?

```javascript
/*
Available variables:
    blue
    green
    yellow
    red
    timer-bg
    margin
    top-offset
    width
*/
notifier.style("blue", "#f00"); // The value must be valid CSS
let margin = notifier.style("margin");
```

> Oh, that's cool! Can I customise CSS directly?

Of course you can! I've even given you some SCSS to chew on!

## Contributing

I don't expect much more modding to happen after actions are added. But if you've got a cool idea, push it through! Remember, though: low-code.

## License

MIT