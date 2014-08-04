angular.module('YouTubeApp',[])
.directive('youtube', function($window){
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
	      scope.$watch('height', function(newValue, oldValue) {
	      	newValue == oldValue ? return : player.setSize(scope.width, scope.height);
		  });

		  scope.$watch('width', function(newValue, oldValue) {
			newValue == oldValue ? return : player.setSize(scope.width, scope.height);
		  });
	      scope.$watch('videoid',function(newValue, oldValue){
	      	// Watch for changes to videoid
	      	newValue === oldValue ? return : player.cueVideoById(scope.videoid);
	      });
	    },
	}
});