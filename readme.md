## Get Started
1. ### Download 2 files to 'dist/lib'
<ul>
    <li><a href="http://b1ix.net/post_inc/c3js/c3.css">c3.min.css</a><br></li>
    <li><a href="http://b1ix.net/post_inc/c3js/c3.js">c3.min.js</a><br></li>
</ul>

2. ### Command `npm i || yarn` in root directory

3. ### Finally, you can start with command `npm start || yarn start`

<br><hr><br>

## Feat

- [x] Draw the graph of UnionLv using C3.js
> - [x] Accumulated graph by date<br>
> - [x] Draw the last 5 data

- [x] Show the List of Characters in Database <br>

- [x] Update & Delete Union characters level in one page <br>

- [x] Add Query condition of UnionLv
> - [x] Sorting array in descending order to 'Lv' <br>
> - [x] UnionLv don't add beyond 40 Characters

<br><hr><br>

## The history of problems handling when developing this project

- [x] ***Fix 1***

```
[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client at ServerResponse.setHeader
```

> cause: Two Responses to one Request <br>
> solution: Send 1 Response

- [x] ***Fix 2***

```
MongooseError: Query was already executed
```

> cause: Mongoose no longer allows executing the same query object twice <br>
> solution: Seperate Query Function Find from Delete

<br><hr><br>

## Considerlation later
<ul>
    <li>Add CSS</li>
    <li>Optimize logic of drawing graph</li>
</ul>