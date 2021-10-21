## Get Started
1. Download 2 files to 'dist/lib'
<ul>
    <li><a href="http://b1ix.net/post_inc/c3js/c3.css">c3.min.css</a><br></li>
    <li><a href="http://b1ix.net/post_inc/c3js/c3.js">c3.min.js</a><br></li>
</ul>

2. Command `npm i` in root directory

3. Finally, you can start with `npm start` in terminal

## Feat

- [x] Draw the graph of UnionLv using C3.js
> - [ ] Accumulated graph by date<br>
> - [x] Draw the last 5 data

- [x] Formating Date using Moment <br>

- [x] Show the List of Characters in Database <br>

- [x] Update & Delete Union characters level in one page <br>

- [x] Add Query condition of UnionLv
> - [x] Sorting array in descending order to 'Lv' <br>
> - [x] UnionLv don't add beyond 40 Characters

<br><hr><br>

## TO DO LIST _211020

- [ ] Accumulated graph by date<br>
> 그래프 x축 데이터 updated 입력하기 -><br>
> 몽구스 스키마 시간 에러 -> <br>
> 서버를 키면, 시간이 가지 않는다. 재시작시 동기화됨(시간이 흐름) -><br>
> moment 라이브러리 문제? 몽구스 문제?
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