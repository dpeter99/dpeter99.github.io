<!DOCTYPE html>
<html lang="eng">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>How does unity do it? Part 1</title>
    <meta content="dpeter99 - How does unity do it? Part 1" property="og:title" />
    <meta content="" property="og:description" />
    <meta content=" https://dpeter99.github.io/posts/how-does-unity-do-it-part-1 " property="og:url" />
    <!--<meta content="https://embed.com/embedimage.png" property="og:image" />-->
    <meta content="#df9711" data-react-helmet="true" name="theme-color" />
    <!--<link rel="stylesheet" href="style/main.css">-->    

    <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>

    <link href="/main.css" rel="stylesheet">

    <script src="/main.js"></script>
</head>

<body class="background-3">

    <div class="content">
        <nav class="navbar card">

    <ul class="navbar-nav">
        <li class="nav-item">
            <a href="/" class="nav-item__link" >
                <!--<img src="/static/img/account-circle-outline.svg" />-->
                <?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   version="1.1"
   viewBox="0 0 24 24"
   id="svg2677"
   sodipodi:docname="account-circle-outline.svg"
   inkscape:version="1.1 (ce6663b3b7, 2021-05-25)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <style
     id="style2689">
.mian-color { 
    fill:#18191c;
}
</style>
  <defs
     id="defs2681" />
  <sodipodi:namedview
     id="namedview2679"
     pagecolor="#505050"
     bordercolor="#eeeeee"
     borderopacity="1"
     inkscape:pageshadow="0"
     inkscape:pageopacity="0"
     inkscape:pagecheckerboard="0"
     showgrid="false"
     inkscape:zoom="12.742653"
     inkscape:cx="7.8868974"
     inkscape:cy="18.010378"
     inkscape:window-width="1920"
     inkscape:window-height="1006"
     inkscape:window-x="1920"
     inkscape:window-y="60"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg2677" />
  <path
     d="m12 2c-5.5228 0-10 4.4772-10 10 0 5.5228 4.4772 10 10 10 5.5228 0 10-4.4772 10-10 0-5.5228-4.4772-10-10-10m-4.93 16.28c0.43-0.9 3.05-1.78 4.93-1.78s4.5 0.88 4.93 1.78c-1.36 1.08-3.07 1.72-4.93 1.72s-3.57-0.64-4.93-1.72m11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93 0.59-6.36 2.33c-1.02-1.33-1.64-3.01-1.64-4.83 0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-0.62 3.5-1.64 4.83"
     id="path2672" />
  <path
     d="m12 6c-1.94 0-3.5 1.56-3.5 3.5 0 1.94 1.56 3.5 3.5 3.5s3.5-1.56 3.5-3.5c0-1.94-1.56-3.5-3.5-3.5"
     id="path2674" />
  <path
     id="eye"
     d="m 11.928,11.635 c -1.1856,0 -2.1467,-0.96111 -2.1467,-2.1467 0,-1.1856 1.1347,-2.1467 2.1467,-2.1467 1.012,0 2.1467,0.96111 2.1467,2.1467 0,1.1856 -0.96111,2.1467 -2.1467,2.1467 z"
     style="display:inline"
     class="main-color  mian-color" />
  <image
     width="4.0685487"
     height="4.0685487"
     preserveAspectRatio="none"
     style="image-rendering:optimizeQuality"
     xlink:href="/static/img/Aperture_Science_orange.png"
     id="image2713"
     x="9.8937254"
     y="7.4540257" />
</svg>

            </a>
        </li>
        <li class="nav-item">
            <a href="/projects" class="nav-item__link">

                <p>Projects</p>

            </a>
        </li>
        <li class="nav-item">
            <a href="/posts" class="nav-item__link">

                <p>Posts</p>

            </a>
        </li>

        <!--{{- partial "i18n.html" . -}}-->
    </ul>


</nav>

            <main class="article">
    <article class="card">
        <div>
            <div class="title">
                <h1>
                    How does unity do it? Part 1
                </h1>
                <h4 class="title__sub">
                    
                </h4>
            </div>
            
        </div>
        <div>
            <p>In this series I will be showing of some of the less known Unity features that I have found while trying to learn from the official packages. As most of these packages are written in c# and compiled when they are imported. This means that all of the code is easy to browse. And more importanlty they use the same c# API that we can use. Meaning that if they can do something so can we!</p>
<h1 class="heading" id="the-core-update-loop" tabindex="-1"><a href="#the-core-update-loop"></a>The core update loop</h1>
<p>In this first part I1m going to talk about the <code>PlayerLoop</code> in Unity.</p>
<p>I found out about this class and what it can do while investigating how the new DOTS packages work. If you have used it than you probably notices that there is no &quot;Entity Manager&quot; that would get the usualy <code>Update</code> function and start the complex update od the entities. But than how does it get executed?</p>
<p>This is where the <code>PlayerLoop</code> comes in. It represents the core update loop of unity. This means it is basically a list of static functions to call in each update.
The class allows you to add and even remove from this list.</p>
<p>Most of what I found out came from <a href="https://blog.beardphantom.com/post/190674647054/unity-2018-and-playerloop">this brilliant article</a> by beardphantom (Mika Notarnicola). They give a really good explanation on what you can do with it.</p>
<p>This class and API gives us the ability to make or replace whole parts of the engine with new systems. This can be useful when you have to optimize for small devices or need all the performance for big games.
You could also replace the whole loop if you wanted and treat the engine more like a framework. You can make sure that only the things that you use and need are running. This level of optimization is usually not needed for a game but when you need it is really useful.</p>
<p>So this is how DOTS does it, they add their own system to be run in the core update loop of unity and so cna you.</p>
<h3 class="heading" id="helpers" tabindex="-1"><a href="#helpers"></a>Helpers</h3>
<p>I have a helper class in my Unity utils package that makes adding a new system easier.
<a href="https://github.com/dpeter99/UnityUtils/blob/main/Runtime/PlayerLoopHelpers.cs">The code</a></p>

        </div>
    </article>
</main>

    </div>
    
</body>

</html>