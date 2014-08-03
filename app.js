angular.module('YouTubeApp',[])
.directive('youtube'), function($window){
	return{
		restrict: 'E', // Element directive

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
	          height: '390',
	          width: '640',
	          videoId: 'M7lc1UVf-VE'
	        });
	      };
	    },
	}
}