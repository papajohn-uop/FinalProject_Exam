Basic Information regarding the Radio configuration Project.
Based on docker containers.
Basic structure:
root/
    adminapp: A PoC regarding an administrator frontend. This user can view and manage all devices. The devices are presented on a map.
    app: The backend of the projetc. Implementation of basic APIs to coomunicate wih DB and external solutions.
        routes: The defined routes
        controllers: The controllers for the routes
        models: The mplemented models
    clientapp: A PoC regarding an ordinary user frontend. This user can view and manage only devices assigned to him. The devices are presented on a map.
    heamap: A PoC regarding a frontend presenting real values regarding the coverage of the 5G netowrk and the speed it supports.
    mysql: The database used
Basic Instructions
    Tested on native Ubuntu 18.04 machine.
    Install docker: 
        https://docs.docker.com/engine/install/ubuntu/
    Install docker-compose
        https://docs.docker.com/compose/install/
    Clone/unzip/copy the source code
    Run: docker-compose up
    To verify check:
        adminapp: localhost:47000
        app: localhost:3000
        clientapp: localhost:46000
        heamap: localhost:48000
  


