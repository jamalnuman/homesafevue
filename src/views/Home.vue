<template>
  <div class="home">
    <div class="row h-100 align-items-center">
        <div class="col-12">
            <div class="welcome_area_content text-center">
                <div class="welcome_content">
                  <section class="welcome_area gradient-background-overlay" style="background-image: url('https://carilionclinicliving.com/sites/default/files/field/image/family%20getting%20ready%20for%20trip.jpg');" id="home">
                      <div class="container h-100">
                      </div>
                    </section>
                    <!-- <div class="watch-overview">
                        <a href="/https://www.youtube.com/watch?v=ZpEPJGFpZtg" class="video_btn"><i class="ti-control-play" aria-hidden="true"></i> Watch My Overview</a>
                    </div> -->
                    <h2>HomeSafe - Committed to safely getting you home </h2>
                    <p>At HomeSafe, we’re all about safety. We want to make sure that you and your family are just as safe outside your home as you are in it.</p>
                    <!-- <a href="/#" class="btn light-btn">Learn More</a> -->
                </div>
            </div>
        </div>
    </div>
    <div class="row">
      <!-- Single gallery Item -->
      <div class="home col-6 col-sm-6 col-md-3 offset-md-3 single_gallery_item">
          <div class="single_gallery_content">
              <img src="https://cdn3.iconfinder.com/data/icons/arrowico/32/Side-Login-512.png" alt="">
              <!-- Hover Effects -->
              <div class="hover_overlay">
                  <div class="gallery_info">
                      <router-link to="/signup" class="btn light-btn preview-btn"> Signup </router-link>
                  </div>
              </div>
          </div>
      </div>

      <!-- Single gallery Item -->
      <div class="home col-6 col-sm-6 col-md-3 single_gallery_item">
          <div class="single_gallery_content">
              <img src="https://cdn1.iconfinder.com/data/icons/small-black-v5/512/account_arrow_enter_in_log_login_signin-512.png" alt="">
              <!-- Hover Effects -->
              <div class="hover_overlay">
                  <div class="gallery_info">
                      <router-link to="/login" class="btn light-btn preview-btn"> Login </router-link>
                  </div>
              </div>
          </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
  
</style>

<script>
  export default{
    data: function() {
      return {};
    },
  created: function() {},
  methods:{}
};
</script>

