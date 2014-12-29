/* global window */
(function (window, angular, undefined) {
    'use strict';

    /**
     * @name smoothScroll
     * @module  smoothScroll
     * @description
     * This module contains anchor scroll functionality.
     */
    angular.module('smoothScroll', [])
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
        .factory('scroll', function($window, $location, $anchorScroll, $timeout){
            return {
                // Scroll to new hash value with changed location hash otherwise,
                // if hash value is not changed, anchorScroll to the given hash.
                scrollTo: function (newHash) {
                    if ($location.hash() !== newHash) {
                        // Set the $location.hash to `newHash` and
                        // $anchorScroll will automatically scroll to it.
                        $location.hash(newHash);
                    } else {
                        // Call $anchorScroll() explicitly,
                        // since $location.hash hasn't changed.
                        $anchorScroll();
                    }
                },

                smoothScrollTo: function (newHash) {
                    var startY = $window.pageYOffset,
                        stopY = elementYPosition(newHash),
                        distance = stopY - startY,
                        stepCount = 25,
                        scrollingSpeed = 100,
                        step = Math.round(distance / stepCount),
                        stepTransitionTime = Math.abs(Math.round(distance / scrollingSpeed)),
                        startLeapY = startY,
                        stopLeapY = startY + step,
                        counter = 0;

                    // Setting up the new hash value.
                    if ($location.hash() !== newHash) {
                        $location.hash(newHash);
                    }

                    // Break total height into multiple steps and scroll each step individiually after
                    // every stepTransitionTime.
                    while (Math.abs(stopY - stopLeapY) >= Math.abs(step)) {
                        stepScrollTo(startLeapY, stopLeapY, counter*stepTransitionTime);
                        stopLeapY += step;
                        startLeapY = stopLeapY;
                        counter++;
                    }

                    // Scroll the left over distance.
                    // Use case: When total distance is not a multiple of step, left over distance
                    // will be less than step.
                    stepScrollTo(startLeapY, stopY, counter*stepTransitionTime);

                    function stepScrollTo (startLeapY, stopLeapY, transitionTime) {
                        $timeout(function () {
                            $window.scrollTo(startLeapY, stopLeapY);
                        }, transitionTime);
                    }

                    function elementYPosition (newHash) {
                        var element = document.getElementById(newHash),
                            y = element.offsetTop,
                            node = element;

                        while (node.offsetParent && node.offsetParent != document.body) {
                            node = node.offsetParent;
                            y += node.offsetTop;
                        }

                        return y;
                    }
                }
            };
        })

        /**
         * @name smoothScrollTo
         * @module smoothScroll
         * @requires $location
         *
         * @description
         * This directive enables us to scroll smoothly to the given hash
         * value
         *
         * @example
         *      <div smooth-scroll-to="it_skills">
         *          Content
         *      </div>
         */
        .directive('smoothScrollTo', function ($location, scroll) {
            return {
                link: function(scope, element, attrs) {
                    element.bind('click', function (evt) {
                        // Set the location.hash to the id of
                        // the element you wish to scroll to.
                        $location.hash(attrs.smoothScrollTo);
                        scroll.smoothScrollTo(attrs.smoothScrollTo);
                    });
                }
            };
        })

;})(window, window.angular); // jshint ignore:line
