# Github Dashboard App

# Deploy (one click)

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/ovidubya/github-dashboard-app">
<img src="https://www.netlify.com/img/deploy/button.svg">
</a>

## Configure

Dashboard will display properties defined in `react/config.json`

`filters.all` - Available filters for dashboard

`filters.selected` - Selected filters for dashboard

`repos` - Array of repos to display to dashboard.

`backend` - Backend url (required)

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
  ],
  "backend": "https://boiling-reef-23922.herokuapp.com"
}
```

## Install

```sh
$ npm i
```

## Run locally

```sh
$ npm run start-react
```

## Build

```sh
$ npm run build
```
