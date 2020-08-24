#lang racket

(require pollen/template/html)

(define (project #:link link #:title title #:lang lang . body)
  (print "Hey")
  (->html
    `(article [(class "portfolio-card-container")]
      (a [(class "portfolio-card") (href ,link)]
        (h2 [(class (format "portfolio-card-title"))] ,title)
        (section [(class "portfolio-card-lang")] ,lang)
        (section [(class "portfolio-card-content")] ,@body)))))