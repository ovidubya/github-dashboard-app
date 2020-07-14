# Github Dashboard App

## Configure

Dashboard will display properties defined in `react/config.json`

`filters.all` - Available filters for dashboard

`filters.selected` - Selected filters for dashboard

`repos` - Array of repos to display to dashboard.

### Example config:

```json
{
  "filters": {
    "all": ["Forks", "Issues", "Stars", "Watchers", "Commits", "Pulls"],
    "selected": ["Forks", "Issues", "Stars"]
  },
  "repos": [
    {
      "owner": "facebook",
      "repo": "react"
    },
    {
      "owner": "angular",
      "repo": "angular.js"
    },
    {
      "owner": "emberjs",
      "repo": "ember.js"
    },
    {
      "owner": "vuejs",
      "repo": "vue"
    }
  ]
}
```

## Install

```sh
$ npm i
```

# Deploy (one click)

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/ovidubya/github-dashboard-app">
<img src="https://www.netlify.com/img/deploy/button.svg">
</a>

## Run locally

```sh
$ npm run start-react
```

## Build

```sh
$ npm run build
```
