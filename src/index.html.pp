#lang pollen

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Evžen Wybitul | Personal Website</title>
    <meta
      name="description"
      content="Evžen Wybitul's personal website, resume and portfolio. See my projects, read about my hobbies, and find links to my GitHub."
    />
    <meta charset="UTF-8" />
    <meta name="robots" content="follow index" />
    <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 2.0" />
    <link rel="stylesheet" type="text/css" media="all" href="styles/styles.css" />

    <link
      rel="preload"
      href="assets/fonts/LibreFranklin/LibreFranklin-Regular.otf"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link
      rel="preload"
      href="assets/fonts/LibreFranklin/LibreFranklin-Black.otf"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link
      rel="preload"
      href="assets/fonts/LibreFranklin/LibreFranklin-Bold.otf"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link rel="preconnect" href="https://d33wubrfki0l68.cloudfront.net" />

    <script type="text/javascript" src="scripts/script.js" defer="defer"></script>
  </head>

  <body>
    <div class="container">
      <nav class="links-container">
        ◊navlink[#:link "assets/files/EvzenWybitul_Resume.pdf"]{Resume}
        ◊navlink[#:link "https://github.com/Eugleo"]{GitHub}
        ◊navlink[#:link "mailto:wybitul@evzen.dev"]{E-Mail}
        ◊navlink[#:link "students/2020-2021/index.html"]{For students}
        <div class="filler"></div>
        <div class="social-media-link js-mode-toggle">
          <a><div role="status" class="js-mode-status"></div></a>
        </div>
      </nav>

      <header class="title-container">
        <h1 class="name"> Hi, I'm<br /><name>Evžen</name><br /><surname>Wybitul</surname> </h1>
        <img
          id="dna"
          src="assets/images/dna.svg"
          alt="A DNA helix comprising of letters E and W, my initials"
        />
      </header>

      <section class="personal-description">
        I study bioinformatics at Charles University in Prague and recently I’ve also got a data
        analyst internship in MSD Prague. You can see some of my previous projects below.
      </section>

      <main class="portfolio-container">
        ◊project[#:title "Gamsa" #:link "https://github.com/Eugleo/gamsa" #:lang "Haskell"]{
            Genetic algorithm multiple sequence alignment, or Gamsa for short, is an efficient
            implementation of a genetic algorithm for the alignment of amino acid sequences. The
            program makes use of the rich Haskell type system which provides flexibility and
            runtime safety.
        }

        ◊project[#:title "Debatimer" #:link "https://github.com/Eugleo/debatimer" #:lang "Swift"]{
          Debatimer is an iOS app made for referees and debaters that debate under the popular
          Karl Popper ruleset. It sports an intuitive UX and can be controlled without even
          looking at the phone. When it was on the AppStore it was one of the most popular iOS
          debate timers.
        }

        ◊project[#:title "Magic Racket & VSCode Pollen" #:link "https://github.com/Eugleo/magic-racket" #:lang "Regex & Javascript"]{
          Those two are the only "user facing" projects in my whole portfolio that are being
          actively used. Both are relatively detailed and complete syntax definitions (so-called
          textmate grammars), to be used in VS Code or similar editors. Both are highly rated
          and well-received in the community.
        }

        ◊project[#:title "Markovify.jl" #:link "https://github.com/Eugleo/markovify.jl" #:lang "Julia"]{
          Markovify.jl is a Julia library that allows the user to generate text with
          characteristics similar to the texts he provides. The generation is based on Markov
          chains (hence the name) and can be thoroughly configured. Depending on which text
          files the user uses as the input, the library can be used to generate new words, new
          sentences or even new names of people and places. It could thus be of interest to
          prose writers or dungeon masters in Dungeons and Dragons.
        }

        ◊project[#:title "ČBF Analysis" #:link "https://github.com/Eugleo/cbf-python-analysis" #:lang "Python, Scrapy, Matplotlib"]{
          This project, which is one of my oldest, uses match data from ČBF (Czech Basketball
            Federation) to show various interesting basketball statistics, such as the frequency
            and accuracy of shots on various positions on the field. However, as it is quite old,
            the most complicated parts are probably the web-crawling, and the plotting.
        }

        ◊project[#:title "Crimson" #:link "https://github.com/Eugleo/crimson" #:lang "C#, Windows Forms"]{
          Crimson is a simple 2D top-down shooter, similar in its playstyle to Crimsonland. It
          is pretty simple in terms of features, the most interesting bit is hidden under the
          hood: the whole game is built upon entity-component-system architecture. ECS is a type
          of game architecture that uses composition over inheritance—not dissimilar to the
          philosophy of functional languages, that I love.
        }

        ◊project[#:title " Bioinformatics Notes" #:link "https://github.com/Eugleo/bioinformatika" #:lang "Racket"]{
          This is an ongoing project that aims to provide standardized notes for all the major
          classes in the bioinformatics curriculum. It leverages the power of the Racket
          publishing system Pollen which allows me to export the content in HTML, PDF and
          plaintext.
        }
      </main>
    </div>
  </body>
</html>
