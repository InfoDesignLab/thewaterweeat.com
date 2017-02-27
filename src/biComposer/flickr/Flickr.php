<?php
/**
 * Flickr handler for Flickr APIs.
 *
 * @package    basili.co
 * @subpackage flickr
 * @author     Dharma Ferrari <dharma@basili.co>
 * @version    0.1 2010-07-14
 */
class Flickr
{
  
  /**
   * Developer API Key (dharmastyle)
   *
   * @var string 
   */
  private $apiKey = 'dd7662b00abf25af8ea715b44f487d97';
  
  /**
   * Index for size SQUARE 
   *
   * @var int
   */
  const SQUARE = 0;
  
  /**
   * Index for size THUMB
   *
   * @var int
   */
  const THUMB = 1;
  
  /**
   * Index for size SMALL
   *
   * @var int
   */
  const SMALL = 2;
  
  /**
   * Index for size MEDIUM
   *
   * @var int
   */
  const MEDIUM = 3;
  
  /**
   * Index for size LARGE
   *
   * @var int
   */
  const LARGE = 5;
    
  /**
   * Complete REST url
   * 
   * @var string
   */
  private $requestUrl;

  /**
   * Collection of parameters to send
   *
   * @var array
   */
  private $requestParams;


  /**
   * Flickr class
   *
   * @param string $apiKey
   */
  public function __construct($apiKey = null) {
    if($apiKey) {
      $this->apiKey = $apiKey;
    }
    
    $this->requestParams = array(
      'api_key' => $this->apiKey,
      'format' => 'php_serial',
    );
  }

  /**
   * Add a parameter to the API call
   *
   * @param string $key
   * @param string $value
   */
  public function addRequestParam($key, $value) {
    $this->requestParams[$key] = $value;
  }

  /**
   * Retrieve array of photosets from given user NSID
   * http://www.xflickr.com/fusr/
   * 
   * @param string $idUser
   * @return array
   */
  public function getPhotosetsList($idUser = null) {
    if(empty($idUser)){
      return array();
    }
    
    $this->addRequestParam('method', 'flickr.photosets.getList');
    $this->addRequestParam('user_id', $idUser);
    $req = $this->submitRequest();

    if(is_array($req)) {
      return $req['photosets']['photoset'];
    } else {
      return array();
    }
  }


  /**
   * Retrieve public photos of a user
   * 
   * @param string $idUser
   * @return array
   */
  public function getUserPhotos($idUser = null) {
    if(empty($idUser)){
      return array();
    }
    
    $this->addRequestParam('method', 'flickr.people.getPublicPhotos');
    $this->addRequestParam('user_id', $idUser);
    $req = $this->submitRequest();

    if(is_array($req)) {
      return $req['photos']['photo'];
    } else {
      return array();
    }
  }
  
  /**
   * Retrieve sizes from given photo id
   * 
   * @param string $idPhoto
   * @return array
   */
  public function getPhotoSizes($idPhoto = null) {
    if(empty($idPhoto)){
      return array();
    }
    
    $this->addRequestParam('method', 'flickr.photos.getSizes');
    $this->addRequestParam('photo_id', $idPhoto);
    $req = $this->submitRequest();

    if(is_array($req)) {
      return $req['sizes']['size'];
    } else {
      return array();
    }
  }

  /**
   * Retrieve specified url from given photo id and type id
   * 
   * @param string $idPhoto
   * @param int $type
   * @return array
   */
  public function getThumbUrl($idPhoto = null, $type = Flickr::SQUARE) {
    $photos = $this->getPhotoSizes($idPhoto);

    if(is_array($photos)) {
      return $photos[$type]['source'];
    } else {
      return array();
    }
  }
  
  /**
   * Retrieve array of photos from given photoset
   * 
   * @param string $idPhotoset
   * @return array
   */
  public function getPhotosetPhotos($idPhotoset = null, $sizes = 'url_sq,url_s,url_t,url_m,url_o') {
    if(empty($idPhotoset)){
      return array();
    }
    
    $this->setPhotoset($idPhotoset);
    $this->addRequestParam('extras', $sizes);
    $req = $this->submitRequest();

    if(is_array($req)) {
      return $req['photoset']['photo'];
    } else {
      return array();
    }
  }
  
  /**
   * Set photoset id
   *
   * @param string $idPhotoset 
   */
  private function setPhotoset($idPhotoset) {
    $this->addRequestParam('method', 'flickr.photosets.getPhotos');
    $this->addRequestParam('photoset_id', $idPhotoset);
  }

  /**
   * Set photoset id
   *
   * @param string $idPhotoset 
   */
  public function getPhotosetInfo($idPhotoset) {
    $this->addRequestParam('method', 'flickr.photosets.getInfo');
    $this->addRequestParam('photoset_id', $idPhotoset);
    $req = $this->submitRequest();
    
    if(is_array($req)) {
      return $req['photoset'];
    } else {
      return array();
    }
  }

  /**
   * Send API request
   *
   * @return array 
   */
  private function submitRequest() {
    $this->buildRequest();

    $rsp = file_get_contents($this->requestUrl);
    $rsp_obj = unserialize($rsp);

    if ($rsp_obj['stat'] == 'ok') {
      return $rsp_obj;
    } else {
      exit("Flickr API says “{$rsp_obj['stat']} ({$rsp_obj['code']})”: {$rsp_obj['message']}");
    }
  }

  /**
   * Build API request
   * Method REST
   */
  private function buildRequest() {
    $encoded_params = array();
    
    foreach ($this->requestParams as $k => $v) {
      $encoded_params[] = urlencode($k).'='.urlencode($v);
    }

    $this->requestUrl = "http://api.flickr.com/services/rest/?".implode('&', $encoded_params);
  }

}