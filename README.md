# Photo Grid Grafana Panel Plugin

Simple photo grid panel for Grafana. This was made using [this guide](https://grafana.com/tutorials/build-a-panel-plugin/) with minimal modifications.

The panel will show a rectangular grid of photos using the first column as url sources, and show every other column when hovered. A link to the given url will also be shown.

The number of columns, min height and the link text can be configured.

## Install

Assuming node 14 and yarn are installed, you can run the following commands to build the plugin

```bash
yarn install
yarn build
```

And then move the generated `dist` directory into your grafana plugins directory. You probably want to rename this directory into something more useful
