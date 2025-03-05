<?php
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Класс вывода video через ссылку (стандартный метод)
class WpEmbededRun {
	static function init() {
		wp_embed_register_handler('rutube', '#https?:\/\/(www\.)?rutube\.ru\/(video|shorts)\/([a-zA-Z0-9_-]+)#i', array( __CLASS__, 'wp_embed_rutube'));
	}


	static function wp_embed_rutube( $matches, $attr, $url, $rawattr ) {
		$video_id = esc_attr($matches[3]);
		$embed = sprintf(
			'<div class="embeded"><iframe width="720" height="405" src="https://rutube.ru/embed/%1$s" frameBorder="0" allow="clipboard-write" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>',
			$video_id
		);
		return $embed;
	}
}

WpEmbededRun::init();
