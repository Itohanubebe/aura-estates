<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function url(string $path = ''): string
{
    return SITE_URL . '/' . ltrim($path, '/');
}

function slugify(string $text): string
{
    $text = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $text) ?: $text;
    $text = strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $text) ?? '');

    return trim($text, '-') ?: 'item';
}

function unique_slug(string $base, ?int $ignoreId = null): string
{
    $slug = slugify($base);
    $candidate = $slug;
    $i = 2;

    while (true) {
        $sql = 'SELECT id FROM properties WHERE slug = :slug' . ($ignoreId ? ' AND id <> :id' : '');
        $stmt = db()->prepare($sql);
        $stmt->bindValue(':slug', $candidate);
        if ($ignoreId) {
            $stmt->bindValue(':id', $ignoreId, PDO::PARAM_INT);
        }
        $stmt->execute();

        if (!$stmt->fetch()) {
            return $candidate;
        }

        $candidate = $slug . '-' . $i;
        $i++;
    }
}

function format_price(?string $price, string $currency = 'USD', string $label = ''): string
{
    if ($label !== '') {
        return $label;
    }

    if ($price === null || $price === '') {
        return 'Price on request';
    }

    $symbols = ['USD' => '$', 'EUR' => '&euro;', 'GBP' => '&pound;', 'AED' => 'AED ', 'NGN' => '&#8358;'];
    $symbol = $symbols[$currency] ?? ($currency . ' ');

    return $symbol . number_format((float) $price, 0, '.', ',');
}

function status_label(string $status): string
{
    return [
        'available' => 'Available',
        'reserved' => 'Reserved',
        'sold' => 'Sold',
        'coming_soon' => 'Coming soon',
    ][$status] ?? ucfirst($status);
}

function media_url(?string $path): string
{
    if (!$path) {
        return url('assets/img/placeholder.svg');
    }

    return UPLOAD_URL . '/' . ltrim($path, '/');
}

function csrf_token(): string
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }

    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">';
}

function csrf_verify(): void
{
    $sent = (string) ($_POST['csrf'] ?? '');

    if ($sent === '' || !hash_equals(csrf_token(), $sent)) {
        http_response_code(419);
        exit('Session expired. Please reload the page and try again.');
    }
}

function redirect(string $path): void
{
    header('Location: ' . $path);
    exit;
}

function flash(?string $message = null): ?string
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }

    if ($message !== null) {
        $_SESSION['flash'] = $message;

        return null;
    }

    $existing = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);

    return $existing;
}
