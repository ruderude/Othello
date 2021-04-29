<?php

function shape($text) {
    return trim(mb_convert_kana($text, "s", 'UTF-8'));
}

function h($text) {
    return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}

