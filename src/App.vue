<template>
  <div class="header" style="background-color:#B0E0E6; padding-top: 20px; padding-bottom: 20px; padding-left: 70px; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
    <RouterLink to="/" class="navbar-brand" style="padding-right: 20px;">Home</RouterLink>
    <RouterLink to="/Wishlist" class="navbar-brand" style="padding-right: 20px;" > Wishlist</RouterLink>
    <RouterLink to="/Work" class="navbar-brand" style="padding-right: 20px;"> Work</RouterLink>
  </div>
  <br />
  <router-view />
</template>

<style></style>
