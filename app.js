var YTApp = angular.module('YouTubeApp',[]);

YTApp.constant('YTEvent',{
	stop: 0,
	play: 1,
	pause: 2,
});

YTApp.controller('YouTubeController', function($scope, YTEvent){
	// Controller is the parent
	$scope.yt = {
		width: 600,
		height: 480,
		videoid: 'praFGD51ih8'
	}; 

	$scope.YTEvent = YTEvent;

	$scope.sendControlEvent = function (controlEvent){
		// Boardcast is used to send events from parent (controller) to child (directive)
		this.$broadcast(controlEvent);
	}
});

YTApp.directive('youtube', function($window, YTEvent){
	// Directive is the child
	return {
		restrict: 'E', // Element directive

		scope: {
			height: '@',
			width: '@',
			videoid: '@'
			// @ used for one-way data binding. Since scope property 
			//and attribute name are same, just @ will suffice.
		},

		template: '<div></div>',
		
				// YouTube iframe API found at https://developers.google.com/youtube/iframe_api_reference
		link: function(scope, element, attrs, $rootScope) {
	      var tag = document.createElement('script');
	      tag.src = "https://www.youtube.com/iframe_api";
	      var firstScriptTag = document.getElementsByTagName('script')[0];
	      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	      var player;

	      $window.onYouTubeIframeAPIReady = function() {
	        player = new YT.Player(element.children()[0], {

	        	// some of the parameters given by the API for use
	        	playerVars:{
	        		autoplay: 0,
	        		html5: 1,
	        		theme: "light",
	        		modesbranding: 0, //Remove YT logo
	        		color: "white",
	        		iv_load_policy: 3, // Turn off anotations by default
	        		showinfo: 1,
	        		controls: 1
	        	},

	          height: scope.height,
	          width: scope.width,
	          VideoId: scope.videoid
	        });
	      }

	      scope.$watch('height + width', function(newValue, oldValue) {
	      	// Apparently, height + width works (and that creates wonders!)
	      	if(newValue == oldValue){
	      		return;
	      	}

	      	player.setSize(scope.width, scope.height);

		  });

	      scope.$watch('videoid',function(newValue, oldValue){
	      	// Watch for changes to videoid
	      	if(newValue == oldValue){
	      		return;
	      	}

	      	player.cueVideoById(scope.videoid);
	      	
	      });

	      // Listen for events
	      scope.$on(YTEvent.stop, function () {
		    player.seekTo(0);
		    player.stopVideo();
		  });

		  scope.$on(YTEvent.play, function () {
		    player.playVideo();
		  }); 

		  scope.$on(YTEvent.pause, function () {
		    player.pauseVideo();
		  });
	    }
	};
});