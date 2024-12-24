<?php
function listDirectory($directory, $indent = "") {
$output = "";
$items = scandir($directory);
sort($items);
foreach ($items as $item) {
if ($item !== "." && $item !== "..") {
$path = $directory . DIRECTORY_SEPARATOR . $item;
if (is_dir($path)) {
$output .= $indent . "|-- " . $item . "/\n";
$output .= listDirectory($path, $indent . " ");
} else {
$output .= $indent . "|-- " . $item . "\n";
}
}
}
return $output;
}
$directory = __DIR__;
$report = "Struttura completa della directory: $directory\n" . listDirectory($directory);
// Salva il file
file_put_contents("struttura_directory.txt", $report);
echo "Report generato in 'struttura_directory.txt'";
?>