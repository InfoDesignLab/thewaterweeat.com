<?php
/**
 * @version   SVN: $Rev: 61 $ – $Date: 2012-09-20 16:18:38 +0200 (gio, 20 set 2012) $
 * @author    SVN: $Author: mar $
 */

// Default container
$project = new Project;


/**
* Manage project modules
*/
class Project
{
  protected $modules = array();
  protected $loaded_modules = array();
  
  /**
   * Default backoffice module
   */
  protected $backoffice = 'cpanel';
  protected $hasBackoffice = FALSE;
  

  public function __construct() {
    if(!file_exists(APP_DIR)) {
      exec("rsync -av --exclude='.svn' ".escapeshellarg(VENDOR_DIR.'skel/').' '.escapeshellarg(APP_DIR));
    }
  }

  public static function setLanguage($lang) {
    return setlocale(LC_ALL, "$lang");	//returns FALSE if not set (unknown locale string?)
  }
  
  public function loadVendor($vendor) {
    require VENDOR_DIR.'vendors/'.$vendor;
  }
  
  public function addModules($modules=array()) {
    foreach ($modules as $module) {
      $this->addModule($module);
    }
  }

  public function addModule($module) {
    array_push($this->modules, $module);
  }
  
  public function useBackoffice($module='') {
    $this->addModule($module ? $module : $this->backoffice);
    $this->hasBackoffice = TRUE;
  }
  
  public function loadModules() {
    foreach ($this->modules as $module) {
      $this->load(VENDOR_DIR.$module."/*");
    }
  }
  
  public function listLoadedModules() {
    return $this->loaded_modules;
  }
  
  public function load($path) {
    if (empty($path) || !file_exists(str_replace("*",'',$path))) { return; }

    foreach (glob("$path.php") as $include) {
      try {
        require $include;
        array_push($this->loaded_modules, $include);
      } catch (Exception $e) {
        exit("$include non trovato");
      }
    }
  }

  public function loadDefaultObjects() {
    $o = array();

    if ($this->hasBackoffice) {
      $o[] = new AtkHelper;
    }

    return $o;
  }
}
