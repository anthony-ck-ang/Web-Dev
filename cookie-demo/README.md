
    ## Cookies
    - The main purpose of a cookie is to identify users and <br> possibly prepare customized Web pages or to save information.
    
    
    ## Some Cookie Types:
        
        `Session` - is destroyed after browser close
        `Permanent` - has max-age or expiry set, can live after browser close
        `httponly` -  can only be set from server, 
                    browser cannot read and get with document.cookie; 
                    this cookie is also sent with every req
                    can be used for, tokens; session-id (don't want to be stolen)
        `Secure` -    only for https sites
        `Third party` - external cookies that track users eg: IP address, website... , 
                              eg. ads/ vids or imgs from other sites embedded in your blog (google/ youtube).
                              Your blog will set cookies for your site/domain.
                              These ads/ vids/ img component will make req to third party domain eg. google analytics
                              and they will set their own cookies in your site.
                              These cookies cannot be accessed from your site, vice versa but are sitting in your site/domain.
        `Zombie` - is recreated with same values even after being deleted; e-tags from the server 
                 ETag (entity tag) response header provides a mechanism to cache unchanged resources
                 304 Not Modified is an HTTP status code that is returned to the client 
                 when the cached copy of a particular file is up to date with the server. 
                 When a client such as a browser stores something in cache, it also keeps the Last-Modified header sent from the server

    
    
  
        - Cookie scope are defined by it's domain eg. abc.com || www.abc.com
        - Includes all sub domain: document.cookie = "a=1; domain=.abc.com "
        - They are sent with every req related to the domain (cookies contain all the info)
        - HTTP is stateless and server stores nothing 
   
    
    
        ## Cookie Security
        - Stealing cookies, inject XSS script:
          having a client side js program that reads your cookie (document.cookie) and send it else where
        - eg. if you click any link and your cookie is not set same-site, the browser will send that cookie GET req
        
        - GET req should always be read only to server
        - POST is used instead to submit any data to be changed
        - Hacker don’t want your cookie, they just want to make a request on your behalf using your cookie while you are signed in to your bank and will inject a script that makes a request on your bank to transfer themselves money in the same site/url
    
    
   
     ### Samesite 
     - https://web.dev/samesite-cookies-explained/
     - https://web.dev/samesite-cookie-recipes/
     
     ### Set this cookie on example.com in the console:
     
     `document.cookie="secretcookie=1; samesite=strict";`
     
     If we navigate to example.com from your website, the cookie will not be sent
    