
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ $title }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="{{url('owl/css/owl.carousel.min.css')}}">
    <link rel="stylesheet" href="{{url('owl/css/owl.theme.default.min.css')}}">
   
  
   <!-- <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">-->
<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link href="{{url('bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
    <!--<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">-->


    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/jquery.validate.min.js"></script>
    <script src="{{url('owl/js/owl.carousel.min.js')}}"></script>
    <script src="{{url('bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <script src="https://kit.fontawesome.com/150b992499.js" crossorigin="anonymous"></script>


    <!-- Styles -->

    <style>
        html,
        body {
            color: black;
            font-family: 'Arial', sans-serif;
            font-weight: 200;
            height: 100vh;
            margin: 0;
            scroll-behavior: smooth;
        }

        body {
            background-color: #80808038;
        }

        .btn-large{
            width:300px;
            text-align:justify;
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
            opacity: 1;
            transition: all 0.5s;
            -webkit-transition: all 0.5s;
        }

        .text-carousel {
            z-index: 5;
            font-weight: 800;
            color: #851231;
            letter-spacing: 0px;
            font-family: "Open Sans";
            font-size: 1.2rem;
        }

        .carousel-caption {
            bottom: 25% !important;
            z-index: 4;
            right:0px !important;
            text-align:left;
        }
        .carousel-caption>a {
           font-size: 1.2rem;
           text-transform: uppercase;
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
            font-weight: bold;
        }

        .btn-primary:hover {
            opacity: 0.8;
            background-color: #00742c;
            border-color: #00742c;
        }

        .primary,a,a:hover {
            color: #00742c;
        }

        .primary:hover {
            color: black;
        }

        .card {
            max-height: 300px;
            min-height: 300px;
            min-width: 200px;
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
    @media only screen and (max-width: 600px) {
        .top-r{
            position: absolute;
            top:-170px;
        }
        .bottom-l{
            position: absolute;
            bottom:-81px;
        }
        .img-phone{
            max-height:300px;
        }
}
        .center-text>.card-body:hover{
            background-color: #851231;
            color:white;
        }
        .swiper-slide{
            min-width: 200px;
        }
        .active>span{
            color: white !important;
            background: #851231;
            padding:6px 12px;
        }
        .top-bar{
           background: white;
        }
        .top-bar>div{
           margin-bottom: 5px; 
        }
        .top-bar>div>button.btn,.top-bar>div>a.btn{
           font-size: small; 
        }
        .top-nav{
            margin-top: 4px !important;
            margin-bottom: 4px !important;
        }
        .swiper-button-next,  .swiper-button-prev{
            color: #851231;
        }
         .swiper-pagination-bullet-active{
             background:  #851231;
         }
         .content{
             min-height: 900px;
             text-align: unset;
         }
    </style>
    <script>
         function myFunction() {
            var element = document.getElementById("idMenu");
            var footer = document.getElementById("idFooter");
           // console.log(document.body.getBoundingClientRect().top)
            if (document.body.getBoundingClientRect().top < 0)
                element.classList.add("fixed-menu");
            else if (footer.getBoundingClientRect().top < 710)
                element.classList.add("fixed-menu");
            else if (footer.getBoundingClientRect().top > 710)
                element.classList.remove("fixed-menu");
        }
    </script>
</head>

<body class="container-fluid" onscroll="myFunction()">
    <div id="idMenu" class="container-fluid" style="background-color: #00742c;">
    
         @include('menu')
    </div>