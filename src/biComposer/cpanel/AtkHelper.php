<?php

class AtkHelper
{
  private $lastNode = null;
  
  public function __construct() {}
    
  public function fetch($node, $options=array()) {
    $this->lastNode = $node;
    return $this->getNode($node)->selectDb($options['where'], $options['order'], $options['limit']);
  }
  
  public function fetchOne($node, $options=array()) {
    $this->lastNode = $node;
    $r = $this->getNode($node)->selectDb($options['where'], $options['order'], 1);
    return $r[0];
  }

  public function getRows($query) {
    return $this->getDb()->getrows($query);
  }
  
  public function query($query) {
    return $this->getDb()->query($query);
  }
  
  public function getDb() {
    if ($this->lastNode) {
      $db = $this->getNode($this->lastNode)->getDb();
    } else {
      $db = atkGetDb();
    }
    
    return $db;
  }
  
  public function getNode($node) {
    return getNode($node);
  }
    
  public function getUploadDir($node='') {
    if (!$node && $this->lastNode) {
      $node = $this->lastNode;
    }
    return str_replace('../','',getNode($node)->getUploadDir());
  }
    
}
