<?php
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Класс вывода галлерей video
class VideoShortCode {
	static function init(){
		add_shortcode( 'video', array(__CLASS__, 'ps_video_function') );
	}

	static function ps_video_function($atts){
		global $post;
		$out = "";
		if($atts["links"]):
			$arrs = explode(',', $atts["links"]);
			if(count($arrs)):
				$out = '<figure class="wp-block-gallery has-nested-images videogallery">';
				foreach($arrs as $link):
					$video = new Video($link);
					$videoInfo = $video->videoInfo;
					if($videoInfo['video']):
						$out .= $videoInfo['video'];
					endif;
				endforeach;
				$out .= "</figure>";
			endif;
		endif;
		return $out;
	}
}

VideoShortCode::init();
