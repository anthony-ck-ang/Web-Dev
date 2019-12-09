## E-tags

`client to server request:`

```html
    E-Tag: "10e54gf-6ae-25w1dz8f"
    GET /user/ant
    if-None-Match: "10e54gf-6ae-25w1dz8f"
```

`Server to client response:`
```html
HTTP/1.1 304 Not Modified
E-Tag: "10e54gf-6ae-25w1dz8f"
```

- If rsc is not changed (e tag validation match), server will not need to send new res/data (returns 304)
- client will take from their local cache

<br>

## Pros
- Improves caching and performance
- Fast response
- Less bandwidth

- Concurrency in DBMS:
Except for modification (POST), 
multiple request/transactions of certain rsc can be executed in parallel (GET)

- Etag can be used to ensure the accuracy/ consistency of the state of data

- eg. if someone has modified the data before my read, my etag will not match,
and transaction will fail

<br>

## Cons

```html

---------------------------------------------------------------------------

				 	--> *web server 1
[client] ---- GET /usr/aaa --> LB ---
				 	--   web server 2

---------------------------------------------------------------------------

				  	 <-- *web server 1
[client] <----- HTTP/200 ----  LB ---
		E-tag "123"		  --  web server 2

---------------------------------------------------------------------------

				  		--  web server 1
[client] ------ GET /usr/aaa ------>   LB ---
	     if-None-Match: "123"	  	--> *web server 2

---------------------------------------------------------------------------

				  		 -- web server 1
[client] <------ HTTP/200  ------   LB ---
	      E-tag "245"	  		<-- *web server 2

---------------------------------------------------------------------------

```

### `Issues:`<br />
- E-tags are generated per server.
- It can be a problem if there is a cluster of web servers <br /> behind a LB that serves such requests.
- The LB may decide to route the request to a different server <br /> which requests in a new etag generation.
- This rend e-tags unless and becomes an overhead (bandwidth)

<br>

### `Solution:`<br />
(Web server config)
- https://web.archive.org/web/20101003235416/http://developer.yahoo.com/blogs/ydn/posts/2007/07/high_performanc_11
- https://www.infoq.com/articles/etags/
- http://www.arctic.org/~dean/tracking-without-cookies.html

<br>

### `Additional Info:`<br />
- E-tags can be used to track your user usage behaviour
- Not easy to be deleted as is managed by the browser

<br>

`Client to server request:`
```html
E-Tag: "10e54gf-6ae-25w1dz8f"
GET /user/ant
if-None-Match: "10e54gf-6ae-25w1dz8f"
```

`Server to client response:`
```html
HTTP/1.1 304 Not Modified
E-Tag: "10e54gf-6ae-25w1dz8f"
```

- Server will always send 304, thus client will always req (send that same e-tag back in the If-None-Match header) in the same way
- Establish a client identity to the server (e-tag suddenly becomes like an uid for the server to identify you)
<br />

### `Further rsc:` <br />
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
