<!doctype html>
{% html lang="zh-cmn-Hans" framework="home:static/js/mod.js" %}
    {% head %}
        {% block preHead %}
        {% endblock %}
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>首页</title>
        <meta name="description" content="">
        <meta name="author" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
        <meta name="wap-font-scale" content="no" />
        <link rel="icon" href="/static/favicon.ico">
        {% require "jquery" %}
        {% require "home:static/css/layout.less" %}
        {% block afterHead %}
        {% endblock %}
    {% endhead %}

    {% body %}
        <div id="app"></div>
        {% script %}
            $ = jQuery = require('jquery');
            require.async(['home:app/main.js']);
        {% endscript %}
    {% endbody %}

{% endhtml %}
