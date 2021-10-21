## Feat

- [x] Formating Date using Moment <br>

- [x] Show the List of Characters in Database <br>

- [x] Update & Delete Union characters level in one page <br>

- [x] Add Query condition of UnionLv
> - Sorting array in descending order to 'Lv' <br>
> - UnionLv don't add beyond 40 Characters

<br><hr><br>

## TO DO LIST _211020

- [ ] Draw the graph of UnionLv using C3.js
> - Accumulated graph by date<br>

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