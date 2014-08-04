var ytApp = angular.module('YouTubeApp',[]);

ytApp.constant('YTEvent',{
	stop: 0,
	play: 1,
	pause: 2,
});

ytApp.controller('YouTubeCtrl', function($scope){
	// Controller is the parent
	$scope.yt = {
		width: 600,
		height: 480,
		videoid: 'praFGD51ih8',
	};

	$scope.YTEvent = YTEvent; 

	$scope.sendControlEvent = function (ytEvent){
		// Boardcast is used to send events from parent (controller) to child (directive)
		this.$broadcast(ytEvent);
	}
});

ytApp.directive('youtube', function($window){
	// Directive is the child
	return{
		restrict: 'E', // Element directive

		scope: {
			height: '@',
			width: '@',
			videoId: '@'
		},

		template: '<div></div>',
				// YouTube iframe API found at https://developers.google.com/youtube/iframe_api_reference
		link: function(scope, element, attrs) {
	      var tag = document.createElement('script');
	      tag.src = "https://www.youtube.com/iframe_api";
	      var firstScriptTag = document.getElementsByTagName('script')[0];
	      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	      var player;

	      $window.onYouTubeIframeAPIReady = function() {
	        player = new YT.Player(element.children()[0], {

	        	// some of the parameters given by the API for use
	        	playerParams:{
	        		autoplay: 0,
	        		html5: 1,
	        		theme: 'light',
	        		modesbranding: 0, //Remove YT logo
	        		color: 'white',
	        		iv_load_policy: 3, // Turn off anotations by default
	        		showinfo: 1,
	        		controls: 1,
	        	},

	          height: scope.height,
	          width: scope.width,
	          videoId: scope.videoid
	        });
	      };

	      scope.$watch('height + width', function(newValue, oldValue) {
	      	// Apparently, height + width works (and that creates wonders!)
	      	if(newValue == oldValue){
	      		return
	      	}
	      	player.setSize(scope.width, scope.height);
		  });

	      scope.$watch('videoid',function(newValue, oldValue){
	      	// Watch for changes to videoid
	      	if(newValue === oldValue){
	      		return;
	      	}
	      	player.cueVideoById(scope.videoid);
	      });

	      // Listen for events
	      scope.$on(YT_event.STOP, function () {
		    player.seekTo(0);
		    player.stopVideo();
		  });

		  scope.$on(YT_event.PLAY, function () {
		    player.playVideo();
		  }); 

		  scope.$on(YT_event.PAUSE, function () {
		    player.pauseVideo();
		  });
	    }
	};
});