#lang racket

(provide (all-defined-out))

(define (class-title title)
  `(h1 [(class "text-black text-4xl font-bold")] ,title))