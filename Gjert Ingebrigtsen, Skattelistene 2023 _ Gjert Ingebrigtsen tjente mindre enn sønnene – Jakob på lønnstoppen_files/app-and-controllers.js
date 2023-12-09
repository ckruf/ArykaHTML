var commentsApp = angular.module('nacomments', ['ngSanitize', 'ngCookies', 'ngRoute', 'angularMoment', 'NaModule']);

commentsApp.factory('publicationInterceptor', function ($routeParams) {
    return {
        request: function (config) {
            config.params = config.params || {};
            config.params.publication = $routeParams.publication;
            return config;
        }
    };
});

commentsApp.constant('appConfig', {
    "cacheBaseUrl": naConfig.cacheBasePath,
    "baseUrl": naConfig.proxyApiBasePath,
    'version': '2.3.6'
});

commentsApp.config(['$routeProvider', '$httpProvider', 'appConfig',
    function($routeProvider, $httpProvider, appConfig) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.interceptors.push('publicationInterceptor');
        $routeProvider.
        when('/:pageurl*', {
            templateUrl: 'views/comment.html?version=' + appConfig.version,
            controller: 'contentController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

commentsApp.run(function(amMoment, moment, $rootScope) {
    amMoment.changeLocale('nb');
});

commentsApp.controller('contentController', function($scope, $http, $location, $window, $cookies, $timeout, $routeParams, $interval, orderByFilter, appConfig, moment) {

    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    // Listen to message from child window
    eventer(messageEvent, function(e) {
        switch (e.data[0]) {
            case "updateAuth":
                $scope.$apply(function() {
                    $scope.getAuthInfo();
                });
                break;
            case "closeDialog":
                if ($window.openedWindow) {
                    $window.openedWindow.close();
                }
                break;
        };
    }, false);

    $window.parent.postMessage(['isMobile', $window.isMobile], '*');

    var currentTime = new Date(),
        responseStatus = { DELETED: 620, KICKOUT: 625 },
        msgPromotes = [],
        msgOfftopics = [];

    moment.max(currentTime);

    var url = $routeParams.url;
    if ($routeParams.header) {
        $scope.header = $routeParams.header;
    }

    $scope.nagStyle = {};

    $scope.topComment = {
        message: "",
        loading: false,
        anonymous: false
    };

    $scope.settingsAndToggles = {
        "messagesLimit": 5,
        "sortOrderType": "creation_date",
        "showMoreButton": true,
        "showOverFlow": false
    };

    $scope.nacommentsOpen = true;
    $scope.nightlyOff = false;

    $scope.publicationMeta = {
        publication: "",
        publicationDisplayName: "",
        rulesAndPolicyUrl: "",
		hideCommentIfNoReplies: "",
        contactEmail: "",
        groupName: ""
    };

    if ($routeParams.replycomment) {
        var replyComment = {
            id: $routeParams.replycomment,
            status: true
        }
    }

    var checkAllowCommenting = function(from, to, type) {
        var currentDate = moment().tz("Europe/Oslo");
        var maxDaysAlowed = 60; // 60 in live
        var fromDate = currentDate.clone();
        var toDate = currentDate.clone();
        var returnVal = true;

        switch (type) {
            case 'hour':
                fromDate.hours(from).minutes(0).seconds(0).milliseconds(0);
                toDate.hours(to).minutes(0).seconds(0).milliseconds(0);

                $scope.fromTime = fromDate.format('HH:mm');
                $scope.toTime = toDate.format('HH:mm');

                var diff = toDate.diff(fromDate);
                if (diff < 0) {
                    if (!currentDate.isBetween(toDate, fromDate, null, '[]'))
                        returnVal = false;
                } else if (currentDate.isBetween(fromDate, toDate, null, '[]'))
                    returnVal = false;
                break;

            case 'day':
                fromDate = moment(from);
                toDate = moment(to);

                var diffDays = moment.duration(toDate.diff(fromDate)).asDays();

                if (diffDays > maxDaysAlowed) {
                    returnVal = false;
                }
        }

        return returnVal;
    };

    var checkNightlyOff = function() {
        $http.get(appConfig.baseUrl + "public/v1/nightlyOff")
            .success(function(data) {
                var fromTime = data.from;
                var toTime = data.to;
                $scope.nacommentsOpen = checkAllowCommenting(fromTime, toTime, 'hour');
                $scope.nightlyOff = !$scope.nacommentsOpen;
            }).error(function(err) {

            })
    };

    var getPublicationMeta = function() {
        $http.get(appConfig.baseUrl + "public/v1/publicationMeta")
            .success(function(data) {
                $scope.publicationMeta.publication = data.publicationName;
                $scope.publicationMeta.publicationDisplayName = data.publicationDisplayName;
                $scope.publicationMeta.rulesAndPolicyUrl = data.debateRulesUrl;
                $scope.publicationMeta.contactEmail = data.contactEmail;
				$scope.publicationMeta.hideCommentIfNoReplies = data.hideCommentIfNoReplies;
				$scope.publicationMeta.welcomeText = data.welcomeText;
				$scope.publicationMeta.hiddenDebateRules = data.hiddenDebateRules || false;
                $scope.publicationMeta.groupName = data.groupName;
                $scope.publicationMeta.userMaxNumberOfCommentsPrArticle = data.userMaxNumberOfCommentsPrArticle;
                $scope.publicationMeta.restrictComments = data.userMaxNumberOfCommentsPrArticle < 10000;
            }).error(function(err) {

            })
    };

    getPublicationMeta();

    $http.get(appConfig.baseUrl + "public/v1/commentingStatus?articleUrl=" + $window.encodeURIComponent(url))
        .success(function(data) {
            $scope.nacommentsOpen = JSON.parse(data);
            if ($scope.nacommentsOpen) {
                if($routeParams.from && $routeParams.to) {
                    $scope.nacommentsOpen = checkAllowCommenting($routeParams.from, $routeParams.to, 'hour');
                    $scope.nightlyOff = !$scope.nacommentsOpen;
                } else {
                    checkNightlyOff();
                }
            }
        }).error(function(err) {
            if($routeParams.from && $routeParams.to) {
                $scope.nacommentsOpen = checkAllowCommenting($routeParams.from, $routeParams.to, 'hour');
                $scope.nightlyOff = !$scope.nacommentsOpen;
            } else {
                checkNightlyOff();
            }
        })

    if ($routeParams.editable == "false") {
        $scope.editable = false;
    }

    $scope.publication = $routeParams.publication || "www.nettavisen.no";
    $scope.scope = $routeParams.scope || "Nettavisen";

    $scope.fromTime = $routeParams.from;
    $scope.toTime = $routeParams.to;
    $scope.newMessage = "";
    $scope.messages = []; // Comments holder
    $scope.myReplies = [];
    $scope.commentsCount = 0;
    $scope.reportOffset = 0;
    $scope.reportedComment = false;

    $scope.toggleUserView = false;

    $scope.credentials = {
        isLoggedIn: false
    };

    if ($cookies.get('nacommentsSortOrder')) {
        $scope.settingsAndToggles.sortOrderType = $cookies.get('nacommentsSortOrder');
    }

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        if (replyComment && replyComment.status) {
            window.parent.postMessage(['setOffset', $('#' + replyComment.id).offset().top], '*');
            replyComment.status = false;
        }
        var newHeight = $('#nacomments-content-wrapper').outerHeight(true) + 20;
        $window.parent.postMessage(['setHeight', newHeight], '*');
    });

    var openWindow = function(url, title) {
        if ($window.openedWindow) {
            $window.openedWindow.close();
        }

        var width = 680,
            height = 620,
            resizable = 1,
            toolbar = 0;
        if ($window.isMobile) {
            width = 450;
            height = 500;
        }
        var winPosY = ($window.screenY || $window.screenTop || 0) + $window.outerHeight / 2 - height / 2,
            winPosX = ($window.screenX || $window.screenLeft || 0) + $window.outerWidth / 2 - width / 2;
        if (!$window.isMobile && $window.chrome && $window.navigator.userAgent.toLowerCase().indexOf("mac os x") !== -1)
            height += 27;
        if (!$window.isMobile && $window.safari)
            height += 47;

        var winOpt = "width=" + width +
            ",height=" + height +
            ",left=" + winPosX +
            ",top=" + winPosY +
            ",resizable=" + resizable +
            ",toolbar=" + toolbar;
        var popupWindow = $window.open(url, title, winOpt);
        popupWindow.focus();

        return popupWindow;
    };

    $scope.toggleReportComment = function(comment, $event) {
        $scope.reportedComment = comment;
        $scope.reportOffset = $event.clientY;
    };

    $scope.showOverFlow = function() {
        $scope.settingsAndToggles.showOverFlow = true;
        updateParentIframeHeight();
    };

    $scope.reportComment = function() {
        var comment =  $scope.reportedComment;
        $http.post(appConfig.baseUrl + "v1/comment/flag?id=" + comment.object_id + "&value=1")
            .success(function() {
                var updateComment = false;
                for (i = 0; i < $scope.messages.length; i++) {
                    if (comment.object_id == $scope.messages[i].object_id) {
                        updateComment = $scope.messages[i];
                    } else if ($scope.messages[i].replies) {
                        updateComment = _.find($scope.messages[i].replies, function(commentMessage) {
                            return commentMessage.object_id == comment.object_id;
                        });
                    }

                    if (updateComment) {
                        if (updateComment.user_flags)
                            updateComment.user_flags.push($scope.credentials.user.user_id);
                        else
                            updateComment.user_flags = [$scope.credentials.user.user_id];
                        break;
                    }
                }
                $scope.reportedComment = false;
            });
    };

    var clearCommentbox = function() {
        if ($cookies.get('nacommentsSortOrder')) {
            $scope.settingsAndToggles.sortOrderType = $cookies.get('nacommentsSortOrder');
        } else {
            $scope.settingsAndToggles.sortOrderType = "creation_date";
        }

        $scope.credentials = {
            isLoggedIn: false
        };

        getSpecialComments(function() {
            $scope.getComments();
        });
    };

    $scope.openLoginDialog = function() {
        window.parent.location.href = appConfig.baseUrl + 'public/v1/login?publication_domain=' + $routeParams.publication + '&requestedUrl=' + encodeURIComponent(window.parent.location.href)
    };

    $scope.openProfileDialog = function(id) {
        if (!id && !$scope.credentials.user) {
            return;
        }
        var randomString = new Date().getTime();
        if (!id) {
            id = $scope.credentials.user.user_id
        }

        if ($scope.credentials.user && id == $scope.credentials.user.user_id) {
            checkIfBannedOrDeleted();
        }

        if (!$window.isMobile) {
            $window.parent.postMessage(['openProfile', id], '*');
        } else {
            $window.openedWindow = openWindow('../profile/?v=1.0#/' + id + "?publication=" + $routeParams.publication, 'review' + randomString);
        }
    };

    $scope.getAuthInfo = function(getMessagesToggle) {
        $window.parent.postMessage(['closeDialog', ""], '*');
        $http.jsonp(appConfig.baseUrl + "v1/profile/dashboard?pageUrl=" + encodeURIComponent($routeParams.url) + "&callback=JSON_CALLBACK")
            .success(function(data) {
                _.each(data, function(field) {
                    if (!field || field == 'null' || field == "null null null") {
                        field = false;
                    }
                });

                if (data.remainingCommentsOnArticle < 1) {
                    $scope.nacommentsOpen = false;
                    $scope.noMoreComments = true;
                }
                $scope.credentials.user = data;
                $scope.credentials.isLoggedIn = true;
                $scope.userHash = $scope.credentials.user.user_id;
                $scope.adminOfThisScope = false;
                if(data.admin_scope_list && data.admin_scope_list.length > 0) {
                    $scope.adminOfThisScope = data.admin_scope_list.includes($routeParams.scope);
                }
                $scope.setIdentity("nauser_nick");

                if (getMessagesToggle) {
                    getSpecialComments(function() {
                        $scope.getComments();
                    })
                }
                checkIfBannedOrDeleted();
            })
            .error(function(result) {
                if (result && result.status == 625) {}
                clearCommentbox();
            });
    };

    var kickoutDeletedLoginedUser = function() {
        $window.alert('Kontoen din er slettet');
    };

    var checkIfBannedOrDeleted = function() {
        $http.jsonp(appConfig.baseUrl + "v1/profile?userId=" + $scope.credentials.user.user_id + "&callback=JSON_CALLBACK")
            .success(function(data) {
                switch (data.status) {
                    case "banned":
                        $scope.nacommentsOpen = false;
                        $scope.credentials.user.status = data.status;
                        break;
                    case "deleted":
                        kickoutDeletedLoginedUser();
                        break;
                    default :
                        if(data.bannedScopeList && data.bannedScopeList.length && data.bannedScopeList.includes($routeParams.scope)) {
                            $scope.nacommentsOpen = false;
                            $scope.credentials.user.status = "banned";
                        }
                }

            });
    };

    $scope.stopShowingUnwantedUsersInfo = function(userStatus, force) {
        return (!!force || userStatus == 'archived' || userStatus == 'deleted' || userStatus == 'banned') &&
            !($scope.credentials.user && $scope.credentials.user.is_admin);
    };

	$scope.shouldDisplayMessage = function(publicationMeta, message) {
		// Does message have replies which are not deleted, show text "deleted".
		// If message deleted && publication wants comment to be hidden
		if (message.deleted && publicationMeta.hideCommentIfNoReplies) {
			// If no replies
			if (!(message.myReplies.length || message.replies)) {
				return false;
			} else {
				// Has replies.
				if (
					message.replies.some(reply => !reply.deleted) ||
					message.myReplies.some(reply => !reply.deleted)
				) {
					//  Not all replies deleted
					return true;
				}
				return false;
			}
		} 
		return true;
	}

    $scope.increaseMessageListRange = function() {
        getComments(true);
    };

    $scope.getProfilePic = function(userPic) {
        return userPic ?
            ((userPic.indexOf('http') == 0 || userPic.indexOf('//') == 0 || userPic.indexOf('img/') == 0) ?
                userPic :
                'https://' + userPic
            ) :
            'img/user-avatar.jpg';
    };

    $scope.setIdentity = function(identityType) {
        switch (identityType) {
            case "nauser_nick":
                $scope.credentials.idType = identityType;
                $scope.credentials.screen_name = $scope.credentials.user.full_name;
                $scope.credentials.profile_image_url = $scope.getProfilePic($scope.credentials.user.profile_image_url);
                if (!$scope.credentials.user.nick_name || $scope.credentials.user.nick_name == 'null') {
                    $scope.credentials.screen_name = $scope.credentials.user.full_name;
                }
                break;
            case "nauser_unverified":
                $scope.credentials.idType = false;
                $scope.credentials.screen_name = false;
                break;
            case "nauser_facebook":
                $scope.credentials.idType = identityType;
                $scope.credentials.screen_name = $scope.credentials.user.fb_full_name;
                $scope.credentials.profile_image_url = "https://graph.facebook.com/" + $scope.credentials.user.fb_uid + "/picture?type=square";
                break;
            default:
                $scope.credentials.idType = false;
                break;
        }
    };

    $scope.scrollToId = function(objectId) {
        window.parent.postMessage(['scrollToId', $('#nacomments-content-wrapper').outerHeight(true)], '*');
        $('html, body').animate({
            scrollTop: $('body').find("#" + objectId).offset().top
        }, 1000);
    };

    $scope.setSortOrderType = function(sortOrderType) {
        $scope.settingsAndToggles.sortOrderType = sortOrderType;
        var newDate = new Date().getTime();
        $cookies.put('nacommentsSortOrder', sortOrderType, { 'expires': "" + newDate + (10 * 365 * 24 * 60 * 60) });

        getSpecialComments(function() {
            $scope.getComments();
        })
    };

    $scope.toggleLike = function(comment) {
        if (!$scope.credentials.isLoggedIn) {
            $scope.openLoginDialog();
        } else {
            var index = comment.user_likes.indexOf($scope.credentials.user.user_id);
            var newLike = index <= -1;
            comment.disableLikeBtn = true;
            $http.post(appConfig.baseUrl + "v1/comment/like?id=" + comment.object_id + "&liked=" + newLike)
                .success(function() {
                    if (newLike) {
                        comment.like_count++;
                        comment.user_likes.push($scope.credentials.user.user_id);
                    } else {
                        comment.like_count -= !!comment.like_count;
                        comment.user_likes.splice(index, 1);
                    }
                    comment.disableLikeBtn = false;
                })
                .error(function(data) {
                    comment.disableLikeBtn = false;
                    console.log('error');
                });
        }
    };

    var toggleStatusComment = function(comment, commentKey, apiKey) {
        var toggleValue = !comment[commentKey];
        $http.post(appConfig.baseUrl + "v1/comment/" + apiKey + "?id=" + comment.object_id + "&value=" + toggleValue)
            .success(function(data, status, headers, config) {
                comment[commentKey] = toggleValue;
            })
            .error(function(err) {
                console.log("error");
            });
    };

    $scope.promoteComment = function(comment) {
        toggleStatusComment(comment, 'promoted', 'promote');
    };

    $scope.offtopicComment = function(comment) {
        toggleStatusComment(comment, 'offtopic', 'offtopic');
    };

    $scope.deleteComment = function(comment, toggle) {
        $http.post(appConfig.baseUrl + "v1/comment/remove?id=" + comment.object_id)
            .success(function() {
                comment.deleted = true;
                comment.delete_type = toggle ? 2 : 1;
            })
            .error(function() {
                console.log("Can't delete comment");
            });
        comment.editCommentToggle = false;
    };

    $scope.postComment = function(object_id, reply, replyContainer, replyToggle, replyId) {
        var fbComment = "false";
        var anonymousComment = null;
        if ($scope.credentials.idType == "nauser_facebook") {
            fbComment = "true";
        }

        if (!object_id) {
            $scope.topComment.loading = true;
            if ($scope.topComment.anonymous) {
                anonymousComment = {
                    reasonText: $scope.topComment.reasonText,
                    notifyMe: $scope.topComment.notifyMe || false
                };
            }
        } else {
            if (replyToggle) {
                replyToggle.loading = true;
                if (replyToggle.anonymous) {
                    anonymousComment = {
                        reasonText: replyToggle.reasonText,
                        notifyMe: replyToggle.notifyMe || false
                    };
                }
            }
        }

        var formData = {
            'message': reply,
            'fbComment': fbComment,
            'articleUrl': url,
            'parent_id': object_id || "",
            'reply_parent_id': replyId || "",
            'commentScope': $scope.scope
        };
        if (anonymousComment) {
            formData.anonymousComment = anonymousComment;
        }
        var postTimeout = $timeout(function() {
            $window.alert("Kunne ikke sende meldingen akkurat nå‚ vennligst prøv igjen senere");
            if (!object_id) {
                $scope.topComment.loading = false;
            } else  {
                reply = "";
                if (replyToggle) {
                    replyToggle.replyBoxToggle = false;
                    replyToggle.newReply = "";
                    replyToggle.anonymous = false;
                    replyToggle.reasonText = '';
                    replyToggle.loading = false;
                }
            }
        }, 10000);

        $http.post(appConfig.baseUrl + "v1/comment/", formData, { timeout: 10000 })
            .success(function(data) {
                $timeout.cancel(postTimeout);
                if (replyToggle) {
                    replyToggle.replyBoxToggle = false;
                    replyToggle.newReply = "";
                    replyToggle.anonymous = false;
                    replyToggle.reasonText = '';
                    replyToggle.loading = false;
                }

                if (!anonymousComment) {
                    var newReply = data;
                    newReply.profileImageUrl = $scope.credentials.profile_image_url;
                    newReply.editComment = data.message;

                    if (replyContainer) {
                        replyContainer.push(newReply);
                    } else {
                        $scope.myReplies.push(newReply);
                    }
                }

                replyToggle = !replyToggle;

                if (!object_id) {
                    $scope.topComment.message = '';
                    $scope.topComment.loading = false;
                    $scope.topComment.anonymous = false;
                    $scope.topComment.reasonText = '';
                }
                reply = "";
            })
            .error(function(data) {
                console.log("Can't save comment");
                $scope.topComment.loading = false;
                $scope.topComment.anonymous = false;
                $scope.topComment.reasonText = '';
                $timeout.cancel(postTimeout);

                if (data.status == responseStatus.DELETED) {
                    kickoutDeletedLoginedUser();
                } else if(data.status == responseStatus.KICKOUT) {
                } else if (replyToggle) {
                    replyToggle.replyBoxToggle = false;
                    replyToggle.newReply = "";
                    replyToggle.anonymous = false;
                    replyToggle.reasonText = '';
                    replyToggle.loading = false;
                }
            });
    };

    $scope.$watch(function() {
        updateParentIframeHeight();
    });

    $scope.updateComment = function(message) {
        var formData = {
            'message': message.editComment,
            'object_id': message.object_id
        };

        $http.post(appConfig.baseUrl + "v1/comment/", formData)
            .success(function() {
                message.message = message.editComment;
                message.editCommentToggle = false;
                message.edited = true;
				message.editedByAdmin = message.editedByAdmin;
            })
            .error(function() {
                console.log('Can\'t update comment');
            });
    };

    var updateParentIframeHeight = function() {
        setTimeout(function() {
            var newHeight = $('#nacomments-content-wrapper').outerHeight(true) + 20;
            window.parent.postMessage(['setHeight', newHeight], '*');
        }, 500);
    };

    var getSpecialCommentsCall = function(status) {
        return $http.get(appConfig.baseUrl + "public/v1/comment/?order=" + $scope.settingsAndToggles.sortOrderType +
            "&includeReply=true&replyLimit=1000" +
            "&pageUrl=" + $window.encodeURIComponent(url) +
            "&" + status + "=true");
    }

    var getSpecialComments = function(callback) {
        getSpecialCommentsCall('promoted')
            .success(function(data) {
                msgPromotes = data;
                getSpecialCommentsCall('offtopic')
                    .success(function(data) {
                        msgOfftopics = data;
                        callback && callback();
                    }).error(function() {
                        callback && callback();
                    });
            }).error(function() {
                callback && callback();
            });
    };

    var commentOffset = 0;
    var comments = {};
    var profileBadges = [
        { name: "Navnet er ikke verifisert", value: "UNVERIFIED", class: "", icon: "error" },
        { name: "Verifisert bruker", value: "VERIFIED", class: "verified", icon: "check_circle" },
        { name: "Gylden bruker", value: "GOLDEN", class: "text-gold", icon: "stars" },
        { name: "Admin", value: "ADMIN", class: "admin", icon: "gps_fixed" }
    ];

    var getProfileBadgeObj = function(value) {
        if (!value) {
            value = "UNVERIFIED";
        }
        return _.find(profileBadges, function(badge) {
            return badge.value == value;
        });
    };

    $scope.getMoreButtonDisabled = false;

    $scope.getComments = function(merge, callback) {
        if (!merge) {
            $scope.messages = [];
            commentOffset = 0;
            comments = {};
            $scope.myReplies = [];
            $scope.settingsAndToggles.showOverFlow = false;
            $scope.settingsAndToggles.showMoreButton = true;
            $scope.settingsAndToggles.messagesLimit = 5;
        }

        if (replyComment) {
            $scope.settingsAndToggles.showOverFlow = true;
            $scope.settingsAndToggles.messagesLimit = 4000;
            if ($scope.commentsCount > 1) {
                $scope.settingsAndToggles.messagesLimit = $scope.commentsCount;
            }
        }

        $scope.getMoreButtonDisabled = true;

        $http.get(appConfig.baseUrl + "public/v1/comment/?order=" + $scope.settingsAndToggles.sortOrderType + "&limit=" + $scope.settingsAndToggles.messagesLimit + "&includeReply=true&replyLimit=1000&offset=" + commentOffset + "&pageUrl=" + $window.encodeURIComponent(url))
            .success(function(data) {
                $scope.getMoreButtonDisabled = false;
                if (data.length == 0 || data.length < $scope.settingsAndToggles.messagesLimit) {
                    $scope.settingsAndToggles.showOverFlow = true;
                    $scope.settingsAndToggles.showMoreButton = false;
                }
                if (data.length > 0 && $scope.settingsAndToggles.sortOrderType === "creation_date" && $scope.nacommentsOpen) {
                    var oldestCommentDate = angular.copy(data[0].creation_date);
                    $scope.nacommentsOpen = checkAllowCommenting(oldestCommentDate, currentTime, 'day');
                }
                commentOffset += data.length;

                // first sort out replies so we can dump them into top level comments
                // depending on how the request is sorted replies can occur any time

                data = data.filter(function(value) {
                    return !((value.anonymousComment && value.anonymousComment.anonymousStatus != "APPROVED") || value.offtopic || value.promoted);
                });

                if (!data.length) {
                    $scope.settingsAndToggles.showMoreButton = false;
                }
                if (!$scope.settingsAndToggles.showMoreButton) {
                    data = data.concat(msgOfftopics);
                }
                if (!$scope.messages.length) {
                    data = msgPromotes.concat(data);
                }
                _.each(data, function(message) {
                    message.creation_date = new Date(message.creation_date);
                    message.replyBoxToggle = false;
                    message.myReplies = [];
                    message.editCommentToggle = false;
                    message.editComment = message.message;
                    if (!message.user_likes) {
                        message.user_likes = [];
                    }
                    if (replyComment && replyComment.id == message.object_id) {
                        message.replyComment = true;
                    }

                    message.profileImageUrl = $scope.getProfilePic(message.profileImageUrl);
                    if (message.fb_id) {
                        message.profileImageUrl = "https://graph.facebook.com/" + message.fb_id + "/picture?type=square";
                    }

                    if (message.userStatus == "deleted") {
                        message.profile_name = "Gjest";
                    }

                    message.profileBadgeObj = getProfileBadgeObj(message.profileBadge);

                    if (!comments[message.object_id]) { // dump comments for lookup later
                        comments[message.object_id] = {
                            object_id: message.object_id,
                            profile_name: message.profile_name
                        };
                    }
                    if (message.parent_id) {
                        if (replies[message.parent_id]) replies[message.parent_id].push(message);
                        else replies[message.parent_id] = [message];
                    } else {

                        if (!message.replies) {
                            message.replies = [];
                        } else {
                            message.replies = orderByFilter(message.replies, 'creation_date', false);

                            var rplPromotes = message.replies.filter(function(value) {
                                return value.promoted;
                            });
                            var rplOfftopics = message.replies.filter(function(value) {
                                return value.offtopic;
                            });
                            message.replies = message.replies.filter(function(value) {
                                return !((value.anonymousComment && value.anonymousComment.anonymousStatus != "APPROVED") || value.offtopic || value.promoted);
                            });
                            message.replies = rplPromotes.concat(message.replies, rplOfftopics);
                            _.each(message.replies, function(message) {
                                message.creation_date = new Date(message.creation_date);
                                message.replyBoxToggle = false;
                                message.myReplies = [];
                                message.editCommentToggle = false;
                                message.editComment = message.message;
                                if (!message.user_likes) {
                                    message.user_likes = [];
                                }
                                if (replyComment && replyComment.id == message.object_id) {
                                    message.replyComment = true;
                                }
                                message.profileImageUrl = $scope.getProfilePic(message.profileImageUrl);
                                if (message.fb_id) {
                                    message.profileImageUrl = "https://graph.facebook.com/" + message.fb_id + "/picture?type=square";
                                }

                                if (message.userStatus == "deleted") {
                                    message.profile_name = "Gjest";
                                }

                                message.profileBadgeObj = getProfileBadgeObj(message.profileBadge);

                                if (!comments[message.object_id]) { // dump comments for lookup later
                                    comments[message.object_id] = {
                                        object_id: message.object_id,
                                        profile_name: message.profile_name
                                    };
                                }
                            });
                        }
                        message.repliesListLimit = $scope.settingsAndToggles.messageLimit // set it to same as global limit by default  
                        $scope.messages.push(message);
                    }
                });

                _.each($scope.messages, function(message) {
                    if (message.replies) {
                        _.each(message.replies, function(reply) {
                            var replyUser = {};
                            if (reply.reply_parent_id && comments[reply.reply_parent_id]) {
                                replyUser.profile_name = comments[reply.reply_parent_id].profile_name;
                                replyUser.object_id = comments[reply.reply_parent_id].object_id;
                            } else {
                                if (reply.parent_id && comments[reply.parent_id]) {
                                    replyUser.profile_name = comments[reply.parent_id].profile_name;
                                    replyUser.object_id = comments[reply.parent_id].object_id;
                                }
                            }

                            reply.replyUser = replyUser;
                        });
                    }
                });
                updateParentIframeHeight();
                $scope.settingsAndToggles.messagesLimit = 10;
                callback && callback();
            })
            .error(function() {
                $scope.getMoreButtonDisabled = false;
            });
    };

    $scope.getAuthInfo(true);

});

commentsApp.directive('onFinishRender', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});

updateAuth = function() { // for login dialog box
    var currentScope = angular.element(document.getElementById("nacomments-content-wrapper")).scope();
    currentScope.$apply(function() {
        currentScope.getAuthInfo();
    });
};