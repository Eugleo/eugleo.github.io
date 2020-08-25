#lang racket

(require pollen/template/html)
(provide (all-defined-out))

(define (project #:link link #:title title #:lang lang . body)
  (->html
    `(article [(class "portfolio-card-container")]
      (a [(class "portfolio-card") (href ,link)]
        (h2 [(class ,(format "portfolio-card-title"))] ,title)
        (section [(class "portfolio-card-lang")] ,lang)
        (section [(class "portfolio-card-content")] ,@body)))))

(define (navlink #:link link text)
  (->html
    `(div [(class "social-media-link")]
        (a [(href ,link)] ,text))))