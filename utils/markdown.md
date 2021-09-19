### Application

今回私が作った application は、統計の application である。ある user が作ったアンケートに対して、不特定多数の user がそのアンケートに対して答える。そして、それらのアンケートに対して集まった回答を統計データとして chart 形式で見ることができるようになる。全てのアンケートとその回答数は、一つのページで全て確認することができるようになっている。

Demo URL
[App](https://hawkar.herokuapp.com/)

---

### 使っている技術

- Language : Javascript
- Server-side : Nodejs (Express framework)
- Client-side : Reactjs (hooks を含む), Redux

- Database: NoSQL (Mongodb)
- Test framework: Jest, supertest
- Caching: Redis
- Version control: Git, GitHub
- Infrastructure: Docker, docker-compose, Heroku
- Cloud: Atlas

---

### 特徴

Application の 94%は Javascript により構成されている。

client-side では、create-react-app により雛形を作ってから application を実装している。 ほぼ全ての state 管理を、redux で行っている。component base での state 管理はあまりしていない。questions からアンケートが次々にランダムに出てくる機能は、redux の action creator での recursive な実装によりできている。

server-side では、node の instance を cluster している。server 側の machine の cpu core 数に応じて node instance が作られる実装をしている。私の mac book pro の cpu スペックは quadcore であり、4 つの instance が作られている。現時点で、私の application において最も処理時間を要するものは、questions の getStats function であり、O(n^2)の time complexity を要する。single-thread の弱点を補うように、統計データがより増えたとしても、cluster 化することで client への response 処理が悪くならない様に実装している。

また、redis による cache 機能の実装では、既存の mongoose library を monkey patch することで機能を実装している。ただこの cache 機能は、全ての function に割り当てられているわけではなく、機能としてはまだ不完全である。また unit test の実装には jest、supertest の framework 達を使用している。全ての function に対して unit test を実装しているわけではない。

---

### local での環境構築

開発時は server side と client side、二つの server を同時に起動しながら開発をしている。terminal を二つ使い server-side、client-side の server を起動する。

    // remote repositryをcloneする
    git clone https://github.com/yac-dev/hawkar.git

    // image達をbuild、container達を起動する
    docker-compose up -d　

    // server-sideのcontainerに入る
    docker-compose exec server bash

    // server-sideのserverを起動する
    npm run dev

    // client-sideのコンテナに入る
    docker-compose exec client bash

    // client-sideのserverを起動する
    npm start

---

[The Complete Javascript Course 2021: From Zero to Expert! ](https://hawkar.herokuapp.com/)
[App](https://hawkar.herokuapp.com/)
[App](https://hawkar.herokuapp.com/)
[App](https://hawkar.herokuapp.com/)
[App](https://hawkar.herokuapp.com/)
[App](https://hawkar.herokuapp.com/)

The Complete Javascript Course 2021: From Zero to Expert! (Jonas Schmedtmann/Udemy)
Nodejs, Express, MongoDB & More: The Complete Bootcamp 2021 (Jonas Schmedtmann/Udemy)
Master the Coding Interview: Data Structures + Algorithms (Andrei Neagoie/Udemy)
The Complete Node.js Developer Course (3rd Edition) (Andrew Mead/Udemy)
米国 AI 開発者がゼロから教える Docker 講座 (かめ れおん/Udemy)
Modern React with Redux (Stephen Grider/Udemy)
The Git & Github Bootcamp (Colt Steele/Udemy)
Node JS: Advanced Concepts (Stephen Grider/Udemy)

## local での環境構築

開発時は、docker-compose を用いて server side と client side、二つの server を同時に起動しながら開発をしている。terminal を二つ使い server-side、client-side の server を起動して開発を行う。
container を起動するのに、host machine の port7000、7300、7400、7500 番を使う。

    // remote repositryをcloneする
    git clone https://github.com/yac-dev/hawkar.git

    // image達をbuild、container達を起動する
    docker-compose up -d

    // server-side用のcontainerに入る
    docker-compose exec server bash

    // server-sideで使うnode module達をinstallする。
    npm install

    // server-side containerのserverを起動する (localhost:7300)
    npm run dev

    // client-side用のcontainerに入る
    docker-compose exec client bash

    // client-sideで使うnode module達をinstallする。
    npm install

    // client-side containerのserverを起動する (localhost:7000)
    npm start

---
