# Casper Network Stats & Decentralization Map

This web app monitors Casper network health, including nodes version distribution, VPS centralization, stake distribution (to prevent possible sybil attacks) and stake distribution by country, active/non-active nodes and validators statistics by date, etc.

---
## Requirements

First you need to install [ casper-world-backend ]( https://github.com/nodesguru/casper-world-backend ).
Then you can proceed with casper world installation.

---

## Install

    $ git clone https://github.com/nodesguru/casper-world
    $ cd casper-world
    $ yarn install

## Configure app

Open .env.local file and fill the following variables:

    NEXT_PUBLIC_GOOGLE_API_KEY=
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_AUTH_SOURCE=

## Running the project

    $ yarn dev

## Simple build for production

```bash
$ yarn build
```

Install as a serivce:
```bash
echo "[Unit]
Description=Casper World
After=network-online.target
[Service]
User=$USER
WorkingDirectory=$HOME/casper-world
ExecStart=$(which yarn) --cwd $HOME/casper-world/ start
Restart=always
RestartSec=1
LimitNOFILE=10000
[Install]
WantedBy=multi-user.target" > $HOME/casper-world.service
sudo mv $HOME/casper-world.service /etc/systemd/system/casper-world.service
sudo systemctl daemon-reload
sudo systemctl enable casper-world
sudo systemctl restart casper-world
```

Casper World will be available on port 3000 (http://YOUR_SERVER_IP:3000).

## License

Released under the MIT license.

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copyright (c) [ Nodes.Guru ]( https://github.com/nodesguru )
