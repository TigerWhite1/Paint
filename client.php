<!DOCTYPE html>

<html>

    <head>

        <meta charset="utf-8" />

        <title>Socket.io</title>

    </head>

 

    <body>

        <h1>Communication avec socket.io !</h1>


        <script src="/socket.io/socket.io.js"></script>

        <script>

            var socket = io.connect('http://localhost:8080');

        </script>

    </body>

</html>