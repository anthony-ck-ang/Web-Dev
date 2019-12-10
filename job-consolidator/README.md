```html

												 Job src:
												 <- Indeed
Front end	<->	API		<-> Redis	<- cron job  <- Github
												 <- Stackoverflow
												 
```

<br>

## `Technologies used:`
- React w/ Hooks + MUI (front end)
- Node-Express JS (api endpoints)
- Cron worker (fetch data)
- Redis + node-redis (consolidate and cache)

<br>

## `To start project:`

<br>

### `Start Server:`
```html
npm run server
```

<br>

### `Start Redis:`
`Open Ubuntu desktop app ->`
```html
sudo service redis-server start
redis-cli
```

<br>

### `Start Cron:`
```html
node api/worker/index.js
```

<br>

### `Start React:`
```html
npm start
```

<br>

## `Other rsc:`
- https://www.npmjs.com/package/@material-ui/core
- https://material-ui.com/
- https://material-ui.com/api/typography/









