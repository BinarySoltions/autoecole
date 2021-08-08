
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ $title }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.css" />
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

    <script src="https://unpkg.com/swiper/swiper-bundle.js"></script>
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link href="{{url('bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/jquery.validate.min.js"></script>
    <script src="{{url('bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <script src="https://kit.fontawesome.com/150b992499.js" crossorigin="anonymous"></script>


    <!-- Styles -->

    <style>
        html,
        body {
            color: #636b6f;
            font-family: 'Nunito', sans-serif;
            font-weight: 200;
            height: 100vh;
            margin: 0;
            scroll-behavior: smooth;
        }

        body {
            background-color: #80808038;
        }

        .full-height {
            height: 100vh;
        }

        .flex-center {
            align-items: center;
            display: flex;
            justify-content: center;
        }

        .position-ref {
            position: relative;
        }

        .top-right {
            position: absolute;
            right: 10px;
            top: 18px;
        }

        .content {
            text-align: center;
        }

        .title {
            font-size: 84px;
        }

        .links>a {
            color: #636b6f;
            padding: 0 25px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
        }

        .m-b-md {
            margin-bottom: 30px;
        }

        .image:after {
            content: '\A';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.6);
            opacity: 1;
            transition: all 0.5s;
            -webkit-transition: all 0.5s;
        }

        .text-carousel {
            z-index: 5;
            white-space: nowrap;
            font-weight: 800;
            color: rgb(255, 255, 255);
            letter-spacing: 0px;
            font-family: "Open Sans";
            visibility: inherit;
            transition: none 0s ease 0s;
            text-align: inherit;
            border-width: 0px;
            opacity: 1;
            transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            transform-origin: 50% 50% 0px;
        }

        .carousel-caption {
            bottom: 70% !important;
            z-index: 4;
        }

        .card-img-top {
            background-color: #00742c;
            text-align: center;
            padding: 20px 10px;
            color: white;
        }

        .card-img-top>svg {
            height: 40px;
            width: 40px;
        }

        .header__logo::before {
            position: absolute;
            left: -400px;
            top: 0;
            width: 630px;
            height: 100%;
            background: white;
            content: "";
            z-index: -1;
            -webkit-clip-path: polygon(0% 0%, 100% 0%, 96% 100%, 0% 100%);
            clip-path: polygon(0% 0%, 100% 0%, 96% 100%, 0% 100%);
        }

        .container-fluid {
            padding-left: 0;
            padding-right: 0;
        }

        .navbar-light .navbar-nav .nav-link {
            color: white;
            font-weight: bold;
            font-family: monospace;
        }

        .btn-primary {
            background-color: #00742c;
            border-color: #00742c;
        }

        .btn-primary:hover {
            opacity: 0.8;
            background-color: #00742c;
            border-color: #00742c;
        }

        .primary {
            color: #00742c;
        }

        .primary:hover {
            color: black;
        }

        .card {
            max-height: 300px;
            min-height: 300px;
        }

        .text-limit {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }

        .li-style-none>li {
            list-style: none;
        }

        .li-style-none>li>i {
            color: #00742c;
        }

        .fixed-menu {
            animation: Fade 1s linear 1s forwards;
            position: fixed;
            z-index: 6;

        }

        @keyframes Fade {
            0% {
                opacity: 0.8;
            }

            100% {
                opacity: 1;
            }
        }

        .nav-link {
            text-transform: uppercase;
        }

        .footer {
            background-color: #283443;
            color: white;
        }

        .footer>div.container {
            padding-top: 30px;
            padding-bottom: 30px;
        }

        div.container {
            padding-top: 12px;
            padding-bottom: 12px;
        }

        .btn {
            margin: 16px 0;
        }
        .center-text>.card-body {
            display: flex;
            text-align: center;
            align-items: center;
            font-weight: bold;
        }
        @media only screen and (min-width: 768px) {
        .center-text>.card-body {
            display: flex;
            text-align: center;
            align-items: center;
            font-size: 1.2rem;
            font-weight: bold;
        }
    }
        .center-text>.card-body:hover{
            background-color: #ccc;
        }
        .swiper-slide{
            min-width: 200px;
        }
    </style>
</head>

<body class="container-fluid" onscroll="myFunction()">
    <div id="idMenu" class="container-fluid" style="background-color: #00742c;">
        <div class="container"> @include('menu') </div>
    </div>