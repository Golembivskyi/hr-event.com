<?php

class Csv
{
    public $name = 'default';
    public $path = __DIR__.'/../../storage';

    private $_filePath;
    private $_csv = '';


    public function __construct($name)
    {
        // Set name of the storage.
        $this->name = $name;

        // Create storage file if it absent.
        $path = realpath(preg_replace('/[\\/]/', DIRECTORY_SEPARATOR, $this->path));
        if( !file_exists($path) ){
            @mkdir($path, 0755, true);
        }
        if( !file_exists($path.'/'.$name.'.csv') ){
            file_put_contents($path.'/'.$name.'.csv', '');
        }else{
            $this->_csv = file_get_contents($path.'/'.$name.'.csv');
        }
        $this->_filePath = $path.'/'.$name.'.csv';
    }


    public function addData($data)
    {
        $this->_csv .= "\n" . implode(',', $data);
		$this->_csv = mb_convert_encoding($this->_csv, "UTF-8", 'auto');
		//$this->_csv = iconv('utf-8',mb_detect_encoding($this->_csv),$this->_csv);
        file_put_contents($this->_filePath, $this->_csv);
    }
}