<?php
if ( ! defined( 'WPINC' ) ) {
	die;
}

class WpBashBoardWidgets {
	static function init() {
		add_action('wp_dashboard_setup', array( __CLASS__, 'add_dashboard_widgets') );
	}

	static function add_dashboard_widgets() {
		wp_add_dashboard_widget('podbelsk_dashboard_widget', '<span>🛠 Техническая поддержка сайта</span>', array( __CLASS__, 'dashboard_widget_function') );
	}

	static function dashboard_widget_function(){
		// Показать то, что вы хотите показать
		$site_title = get_bloginfo( 'name' );
		echo '<div class="podbelsk_dash_wrapper">
	<div class="podbelsk_dash_wrapper-header"></div>
	<ul>
		<li>Telegram: <a href="https://t.me/ProjectSoft" target="_blank">ProjectSoft</a> aka Чернышёв Андрей</li>
		<li>Email: <a href="mailto:projectsoft2009@yandex.ru?subject=Проблемы с сайтом ' . site_name() . '">projectsoft2009@yandex.ru</a></li>
		<li>Phone: <a href="tel:+79376445464" target="_blank">+7(937)644-54-64</a></li>
	</ul>
</div>';
	}
}

WpBashBoardWidgets::init();