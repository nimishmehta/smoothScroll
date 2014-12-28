smoothScroll
============

Angular resources for anchor smooth scrolling 


        /**
         * @name scroll
         * @module smoothScroll
         * @requires $location
         * @requires $anchorScroll
         * @requires $window
         * @requires $timeout
         *
         * @description
         * Scroll to new hash value with changed location hash otherwise,
         * if hash value is not changed, anchorScroll to the given hash.
         * This service facilitated with two scrolling methods:
         *      1. scrollTo: scroll to hash value without transition.
         *      2. smoothScrollTo: scroll to hash value with smooth transition.
         *
         *
         * @param {string} newHash New location hash value
         */
