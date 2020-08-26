#lang racket

(require pollen/decode)

(provide (all-defined-out))

(define (class-title title)
  `(h1 [(class "text-black text-4xl font-bold")] ,title))

(define (img-wrapper img-path body)
  `(div [(class "flex flex-row")]
      (div (img [(src ,img-path) (class "w-5 h-5 mr-3")]))
      ,body))

(define (header #:img-path img-path #:next-lecture next-lecture #:homeworks (hws #f) #:tests tests #:last-update last-update title)
  (define test-paragraph
    (img-wrapper
      "/assets/images/file-text.svg"
      (cond
        [(empty? tests)
          `(p [(class "text-gray-400 text-sm")] "Žádný test není ohlášen")]
        [(eq? 1 (length tests))
          `(p [(class "text-gray-600 text-sm")]
            (format "Nejbližší test se bude konat ~a" (first tests)))]
        [else
          `(p [(class "text-gray-600 text-sm")]
              ,(string-join tests ", " #:before-first "Čekají nás testy " #:before-last " a "))])))

  (define hw-paragraph
    (img-wrapper
      "/assets/images/home.svg"
      (if hws
        `(p [(class "text-gray-600 text-sm mb-2")] ,hws)
        `(p [(class "text-gray-400 text-sm mb-2" )] "Neblíží se odevzdání žádného úkolu"))))

  (define next-lecture-paragraph
    (img-wrapper
      "/assets/images/calendar.svg"
      `(p [(class "text-gray-600 text-sm mb-2")]
        "Další přednáška bude v " (span [(class "font-semibold")] ,next-lecture))))

  `(div [(class "mb-10 z-10 relative")]
    (div [(class "bg-white rounded-lg shadow-xl mb-2 -mt-16 flex flex-row overflow-hidden")]
      (div [(class "hidden sm:block w-2/3 bg-cover bg-right") (style ,(format "background-image: url(~a)" img-path))])
      (div [(class "w-full")]
        (div [(class "text-black text-4xl font-bold px-8 py-6 text-center sm:text-left")] ,title)
        (div [(class "flex flex-col px-8 py-6 bg-gray-100")]
          ,next-lecture-paragraph
          ,hw-paragraph
          ,test-paragraph)))
    (div [(class "text-xs w-full text-gray-600 text-right")] ,(format "naposledy upraveno ~a" last-update))))

(define (hw number)
  `(a [(class "font-semibold hover:text-gray-700") (href ,(format "ukoly/~a" number))] ,(format "#U~a" number)))

(define (hw-bonus number)
  `(a [(class "font-semibold hover:text-gray-700") (href ,(format "bonusy/~a" number))] ,(format "#B~a" number)))

(define (lecture number)
  `(a [(class "font-semibold hover:text-gray-700") (href ,(format "prednasky/~a" number))] ,(format "#P~a" number)))

(define (box #:subtitle subtitle #:details details #:link link title)
  `(div
      (a [(href ,link)]
        (div [(class "rounded-lg cursor-pointer display-block shadow-xs overflow-hidden hover:shadow-lg transition duration-100")]
          (div [(class "w-full bg-white px-8 py-4")]
            (div [(class "text-gray-black font-semibold mb-1")] ,@title)
            (div [(class "text-gray-500 mb-1")] ,subtitle))
          (div [(class "w-full px-8 py-4 bg-gray-100 text-xs text-gray-600")]
            (div [(class "text-gray-500 text-sm")] ,details))))))

(define (box-hw #:number num #:date date #:details details #:bonus (bonus #f) . title)
  (define subtitle `(p ,(if bonus (hw-bonus num) (hw num)) " zadaný " ,date))
  (box #:subtitle subtitle #:details details #:link (format (if bonus "bonusy/~a" "ukoly/~a") num) title))

(define (box-lecture #:number num #:date date #:details details  . title)
  (define subtitle `(p ,(lecture num) " odpřednášená " ,date))
  (box #:subtitle subtitle #:details details #:link (format "prednasky/~a" num) title))

(define (section text)
  `(h2 [(class "text-2xl font-bold text-black mb-4 mt-8")] ,text))

(define (subsection text)
  `(h2 [(class "text-md font-bold text-black mb-4 mt-8")] ,text))

(define (info-box . body)
  `(div [(class "px-8 pt-8 pb-4 my-8 bg-white rounded-lg shadow-xs")] ,@body))

(define (paragraph body)
  `(p [(class "mb-4")] ,@body))

(define (root . elements)
  (define level-1
    (decode-elements
      elements
      #:exclude-tags '(mathjax pre code)
      #:string-proc (compose1 smart-quotes smart-dashes)))

  (define level-2
    (decode-elements
      level-1
      #:exclude-tags '(pre code)
      #:txexpr-elements-proc
        (lambda (el)
          (decode-paragraphs
            el
            paragraph
            #:linebreak-proc (lambda (x) (decode-linebreaks x " "))))))

  `(root ,@level-2))