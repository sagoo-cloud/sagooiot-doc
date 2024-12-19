---
slug: sagooiot-updatav1tov2
title: SagooIoT V1.x to V2.x Upgrade Guide
authors: [microrain]
tags: [sagooiot, version upgrade]
---

Professional or Enterprise version users should read this article carefully. This article mainly covers the update instructions for upgrading from V1.x version to V2.x version. The V2.x version includes database field changes, so please pay attention to the following content.

{/* truncate */}
## Installation Instructions

### Required Services
    * It is strongly recommended to pull all code repositories on your local computer rather than on the server.
    * After pulling all code repositories, compile them in the corresponding local projects, and then place the compiled files in the corresponding server directories.
    * Note: All services require installation of corresponding language dependencies locally. For example, after pulling the backend repository code, configure `https://goproxy.io` and execute `go mod tidy` in the project root directory to pull dependencies. After pulling the frontend repository code, execute `yarn install or npm install` in the project root directory.

#### Backend Service
1. Pull repository code `http://收费版代码库/Sagoo-Cloud/sagooiot-professional.git` corresponding branch `main`.
2. Compile backend service `./build.sh linux|windows|mac` followed by compilation type, such as `linux`, `windows`, `mac`.
    * Note: If upgrading from V1 version to V2 version, database fields have changed. Check `./tools/update/readme.md` file.
    * Note: Check if there are new default table fields in `./manifest/sql/init.sql` file.
    * Note: If not upgrading from V1 to V2 version, just import `./manifest/sql/init.sql` file into the database.
3. After compilation, check if there is a `build` directory in the root directory; if present, compilation was successful.
4. Content in the `bin` directory is what needs to be deployed on the server.
5. It is recommended to place the compiled content in the `/opt/sagoo/iot-server` directory on the server.
6. Please first check if the configuration files in the compiled directory are as needed; if not, modify the configuration files. Modify the content of `config/config.yaml` file to the actual configuration to be used.
7. After completing the above steps, start the service with `./curl.sh start`.

### Frontend Service
1. Pull repository code `http://收费版代码库/Sagoo-Cloud/sagoo-admin-ui.git` corresponding branch `professional2`.
2. Build frontend service with `vite build`.
3. Content in the `dist` directory is what needs to be deployed on the server.
4. After compilation, check if there is a `dist` directory in the root directory; if present, compilation was successful.
5. It is recommended to place the compiled content in the `/opt/sagoo/iot-ui` directory on the server.

### Configuration Service
1. Pull repository code `http://收费版代码库/Sagoo-Cloud/sagoo-configuration.git` corresponding branch `v2`.
2. Build configuration service with `npm run build`.
3. Content in the `dist` directory is what needs to be deployed on the server.
4. After compilation, check if there is a `dist` directory in the root directory; if present, compilation was successful.
5. The compiled content needs to be placed in the frontend project root directory under `frontend-project/plugin/topo` (ignore if plugin directory already exists).

### Big Screen Service
1. Pull repository code `http://收费版代码库/Sagoo-Cloud/big-screen-editor.git` corresponding branch `master`.
2. Build configuration service with `npm run build`.
3. Content in the `dist` directory is what needs to be deployed on the server.
4. After compilation, check if there is a `dist` directory in the root directory; if present, compilation was successful.
5. The compiled content needs to be placed in the frontend project root directory under `frontend-project/plugin/screen` (ignore if plugin directory already exists).

### Media Streaming Service
1. Pull repository code `http://收费版代码库/Sagoo-Cloud/sagoo-media.git` corresponding branch `main`.
2. Compile backend service `./build.sh linux|windows|mac` followed by compilation type, such as `linux`, `windows`, `mac`.
3. Content in the `bin` directory is what needs to be deployed on the server.
4. After compilation, check if there is a `bin` directory in the root directory; if present, compilation was successful.
5. The compiled content needs to be placed in the backend project root directory under `backend-project/server/SagooMedia` (ignore if server directory already exists).

### Rule Engine Service
    * Note: The following is for rule engine installation on a `centos` server.
    * Note: Due to differences in server operating systems or personal computer local environments, installing nodejs may encounter different issues. If problems occur during installation, find solutions independently.
1. Pull repository code `http://收费版代码库/Sagoo-Cloud/rule-engine.git` corresponding branch `main`.
2. Compress the project directly and place it under `/opt/sagoo/rule-engine` on the server.
3. In the rule engine project root directory's `config.js`, `SERVER_PORT` is the IOT service port, as it needs to access the IOT service for token verification to implement auto-login. If the port is inconsistent, modify the corresponding value of `SERVER_PORT`.
4. Check if it's the latest version `yum list nodejs` (skip step 5 if it's the latest version).
5. If not, add download version source information through `curl --silent --location https://rpm.nodesource.com/setup_18.x | sudo bash`.
6. It's recommended to switch source information before installation. `npm config set registry https://registry.npm.taobao.org/`
    * As the default is foreign npm source information with slow download speed, switch to domestic npm source information before installation.
7. Install nodejs `yum install nodejs`.
8. Install pm2 globally `sudo npm i pm2 -g`.
9. Install package dependencies in the `rule-engine` directory with `npm install`.
10. Start the project `pm2 start packages/node_modules/node-red/red.js --name rule-engine:2881`.
11. You can check the rule-engine project running status with `pm2 show rule-engine:2881`.

### Docker One-Click Deployment
      * Note: Docker and docker-compose need to be installed.
      * Note: If problems occur after deployment, it's recommended to first place the compiled frontend and backend content from previous steps in the corresponding docker folders.
      * Note: Replace the frontend directory `nginx/html/iot-ui` with the corresponding frontend service compiled file content. For the backend directory `iot-professional`, only replace the backend compiled binary file `sagooiot`.
1. Pull repository code `http://收费版代码库/Sagoo-Cloud/sagoo-docker-compose.git` corresponding branch `master`.
2. As rule-engine still needs manual compilation, confirm if nodejs and global pm2 are installed. If not installed, please check the rule engine service installation steps above.
3. After installing nodejs and pm2, enter the `rule-engine/rule-engine` directory, install dependencies with `npm install`.
4. Return to the `sagoo-docker-compose` directory and execute `docker-compose up -d` to start containers.
5. Stop and clean up containers with `docker-compose down`.


## Below is a list of all required project repositories and branch information

      * Note: Don't pull wrong repositories or branches. Contact WeChat Enterprise work personnel if branch code updates are needed.

| Service Name | Frontend/Backend | Language Type | Repository URL | Branch |
|----------|----|--------|-----|---------------|
| IOT Main Program Backend Service | Backend | GO | http://收费版代码库/Sagoo-Cloud/sagooiot-professional.git | main |
| IOT Main Program Frontend | Frontend | VUE | http://收费版代码库/Sagoo-Cloud/sagoo-admin-ui.git | professional2 |
| Configuration | Frontend | VUE | http://收费版代码库/Sagoo-Cloud/sagoo-configuration.git | v2 |
| Big Screen | Frontend | VUE | http://收费版代码库/Sagoo-Cloud/big-screen-editor.git | master |
| Media Streaming Frontend | Frontend | VUE | http://收费版代码库/Sagoo-Cloud/sagoo-media-ui.git | master |
| Media Streaming Service | Backend | GO | http://收费版代码库/Sagoo-Cloud/sagoo-media.git | main |
| Rule Engine Service | Frontend | nodejs | http://收费版代码库/Sagoo-Cloud/rule-engine.git | main |
| Docker Orchestration, Including All Service Components (One-Click Deployment) | | | http://收费版代码库/Sagoo-Cloud/sagoo-docker-compose.git | master |
