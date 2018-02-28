# @shopin-ico-web

### Getting Started

```sh
npm install
npm run build
npm run start
```
Note: build and start are really just for production. What you'll do locally is...

### Test Environment

```sh
npm install
npm run dev-build
npm run dev
```
Note: dev-build and dev are for testing purpose before running the production commands

### Development
Watch for `src/` file changes, and build app accordingly: 
```sh
npm run watch
```

In a separate terminal window:
```sh
npm run dev
```

This will run the app over at: [http://localhost:4080/](http://localhost:4080/)

### References:
Design Assets & Exports: [https://www.dropbox.com/sh/ig6x1w8b4lb9qzz/AABHzpjRlnYwdy5XYYwEKnZta?dl=0](https://www.dropbox.com/sh/ig6x1w8b4lb9qzz/AABHzpjRlnYwdy5XYYwEKnZta?dl=0)
Nearly everything we need is here. Sketch files, icons, graphics, you name it. There are also videos to portray how certain elements and user interactions animate.

Flex Layout CSS: [https://www.webcomponents.org/element/PolymerElements/iron-flex-layout/page/GUIDE.md](https://www.webcomponents.org/element/PolymerElements/iron-flex-layout/page/GUIDE.md)
If you need to reference the actual classes themselves, they're here starting at line #16, ending line #131: [theme/layout.css](https://github.com/PASSOSYNC/ico/blob/develop/src/client/theme/layout.css#L16)

Atomic Component Architecture: [http://bradfrost.com/blog/post/atomic-web-design/](http://bradfrost.com/blog/post/atomic-web-design/)
For a better understanding of how the client's components should be architected. This is not a React specific guide, but rather showcasing an atomic approach to designing your UI with a set of reusuable components.
