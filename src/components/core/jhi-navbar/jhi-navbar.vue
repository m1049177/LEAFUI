<template>
<div>
  <b-navbar toggleable="md" type="dark" class="jh-navbar">
    <div class="jh-logo-container float-left">
      <b-navbar-toggle
        right
        class="jh-navbar-toggler d-lg-none float-right"
        href="javascript:void(0);"
        data-toggle="collapse"
        target="header-tabs"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <font-awesome-icon icon="bars" />
      </b-navbar-toggle>
      <b-navbar-nav class="ml-auto logo">
        <b-nav-item class="float-left">
          <span v-if="!authenticated" style="color:white">LEAF</span>
          <span>
             <SideNavBar v-if="authenticated"></SideNavBar> 
            <!-- <sibeBar v-if="authenticated"></sibeBar> -->
            <img class='logoImage' src='../../../assets/images/logo.svg'/>
          </span>
        </b-nav-item>
      </b-navbar-nav>
    </div>
    
    <b-collapse is-nav id="header-tabs">
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-item to="/" exact>
          <span>
            <font-awesome-icon icon="home" />
            <span>Home</span>
          </span>
        </b-nav-item> -->
        <b-nav-item v-if="authenticated" active-class="active" class="pointer">
          <companyDropdown />
        </b-nav-item>
        <b-nav-item-dropdown
          id="entity-menu"
          v-if="authenticated"
          :class="{'router-link-active': subIsActive('/entity')}"
          active-class="active"
          class="pointer"
        >
          <span slot="button-content" class="navbar-dropdown-menu">
            <font-awesome-icon icon="th-list" />
            <span>Entities</span>
          </span>
          <b-dropdown-item to="/entity/oraganizational-unit">
            <font-awesome-icon icon="building" />
            <span>OraganizationalUnit</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/line-of-business">
            <font-awesome-icon icon="briefcase" />
            <span>LineOfBusiness</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/application">
            <font-awesome-icon icon="laptop" />
            <span>Application</span>
          </b-dropdown-item>

          <b-button v-b-toggle.dropdownCollapse class='data-dropdown'>
            <font-awesome-icon icon="folder" />
            <span>Data</span></b-button>
        <b-collapse style="padding-left:20px;" id="dropdownCollapse">
          <b-dropdown-item to="/entity/revenue">
            <font-awesome-icon icon="asterisk" />
            <span>Revenue</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/spend">
            <font-awesome-icon icon="asterisk" />
            <span>Spend</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/functionality">
            <font-awesome-icon icon="asterisk" />
            <span>Functionality</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/report">
            <font-awesome-icon icon="asterisk" />
            <span>Report</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/integration">
            <font-awesome-icon icon="asterisk" />
            <span>Integration</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/expenditure">
            <font-awesome-icon icon="asterisk" />
            <span>Expenditure</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/budget">
            <font-awesome-icon icon="asterisk" />
            <span >Budget</span>
          </b-dropdown-item>
            <b-dropdown-item to="/entity/brand">
            <font-awesome-icon icon="asterisk" />
            <span>Brand</span>
            </b-dropdown-item>
    </b-collapse>
    <div>
    <b-button v-b-toggle.LOBCollapse class='data-dropdown'>
            <font-awesome-icon icon="users" />
            <span>LOB functions</span></b-button></div>
        <b-collapse style="padding-left:20px;" id="LOBCollapse">
          <b-dropdown-item to="/entity/business-function">
            <font-awesome-icon icon="asterisk" />
            <span>BusinessFunction</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/capabilities">
            <font-awesome-icon icon="asterisk" />
            <span>Capabilities</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/business-process">
            <font-awesome-icon icon="asterisk" />
            <span>BusinessProcess</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/activity">
            <font-awesome-icon icon="asterisk" />
            <span>Activity</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/task">
            <font-awesome-icon icon="asterisk" />
            <span>Task</span>
          </b-dropdown-item>
      </b-collapse>
        <b-dropdown-item to="/entity/employee">
            <font-awesome-icon icon="users" />
            <span>Employee</span>
          </b-dropdown-item>
       <b-button v-b-toggle.techCollapse class='data-dropdown'>
            <font-awesome-icon icon="book" />
            <span>Technology Data</span></b-button>
        <b-collapse style="padding-left:20px;" id="techCollapse">
          <b-dropdown-item to="/entity/technology">
            <font-awesome-icon icon="asterisk" />
            <span>Technology</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/technology-stack">
            <font-awesome-icon icon="asterisk" />
            <span>TechnologyStack</span>
          </b-dropdown-item>
            <b-dropdown-item to="/entity/technology-suggestions">
            <font-awesome-icon icon="asterisk" />
            <span>TechnologySuggestions</span>
          </b-dropdown-item>
            <b-dropdown-item to="/entity/technology-recommendation">
            <font-awesome-icon icon="asterisk" />
            <span>TechnologyRecommendation</span>
          </b-dropdown-item>
        </b-collapse>

          <b-dropdown-item to="/entity/evaluation">
            <font-awesome-icon icon="chart-line" />
            <span>Evaluation</span>
          </b-dropdown-item>
    
          <b-dropdown-item to="/entity/label">
                        <font-awesome-icon icon="asterisk" />
                        <span >Label</span>
                    </b-dropdown-item>
          <b-dropdown-item to="/entity/diagram">
                        <font-awesome-icon icon="asterisk" />
                        <span >Diagram</span>
                    </b-dropdown-item>
          <b-dropdown-item to="/entity/budget">
                        <font-awesome-icon icon="asterisk" />
                        <span >Budget</span>
                    </b-dropdown-item>
          <b-dropdown-item to="/entity/spend">
                        <font-awesome-icon icon="asterisk" />
                        <span >Spend</span>
                    </b-dropdown-item>
          <b-dropdown-item to="/entity/revenue">
                        <font-awesome-icon icon="asterisk" />
                        <span >Revenue</span>
                    </b-dropdown-item>
          <b-dropdown-item to="/entity/integration">
                        <font-awesome-icon icon="asterisk" />
                        <span >Integration</span>
                    </b-dropdown-item>
          <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
        </b-nav-item-dropdown>
        <b-nav-item-dropdown
          id="admin-menu"
          v-if="hasAnyAuthority('ROLE_ADMIN')"
          :class="{'router-link-active': subIsActive('/admin')}"
          active-class="active"
          class="pointer"
        >
          <span slot="button-content" class="navbar-dropdown-menu">
            <font-awesome-icon icon="user-plus" />
            <span>Administration</span>
          </span>
          <b-dropdown-item to="/admin/user-management">
            <font-awesome-icon icon="user" />
            <span>User management</span>
          </b-dropdown-item>
          <b-dropdown-item to="/admin/jhi-metrics">
            <font-awesome-icon icon="tachometer-alt" />
            <span>Metrics</span>
          </b-dropdown-item>
          <b-dropdown-item to="/admin/jhi-health">
            <font-awesome-icon icon="heart" />
            <span>Health</span>
          </b-dropdown-item>
          <b-dropdown-item to="/admin/jhi-configuration">
            <font-awesome-icon icon="list" />
            <span>Configuration</span>
          </b-dropdown-item>
          <b-dropdown-item to="/admin/audits">
            <font-awesome-icon icon="bell" />
            <span>Audits</span>
          </b-dropdown-item>
          <b-dropdown-item to="/admin/logs">
            <font-awesome-icon icon="tasks" />
            <span>Logs</span>
          </b-dropdown-item>
          <b-dropdown-item v-if="swaggerEnabled" to="/admin/docs">
            <font-awesome-icon icon="book" />
            <span>API</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/assessment">
            <font-awesome-icon icon="pen-fancy" />
            <span>Assesment</span>
          </b-dropdown-item>
          <b-dropdown-item to="/uploadDataSheet">
            <font-awesome-icon icon="share-square" />
            <span>Upload/Download Data Sheets</span>
          </b-dropdown-item>
          <b-dropdown-item to="/entity/excel-template">
            <span>Upload Template</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown
          right
          href="javascript:void(0);"
          id="account-menu"
          :class="{'router-link-active': subIsActive('/account')}"
          active-class="active"
          class="pointer"
        >
          <span slot="button-content" class="navbar-dropdown-menu">
            <font-awesome-icon icon="user" />
            <span>Account</span>
          </span>
          <b-dropdown-item to="/entity/company">
            <font-awesome-icon icon="building" />
            <span>Company Profile</span>
          </b-dropdown-item>
          <b-dropdown-item to="/account/settings" tag="b-dropdown-item" v-if="authenticated">
            <font-awesome-icon icon="wrench" />
            <span>Settings</span>
          </b-dropdown-item>
          <b-dropdown-item to="/account/password" tag="b-dropdown-item" v-if="authenticated">
            <font-awesome-icon icon="lock" />
            <span>Password</span>
          </b-dropdown-item>
          <b-dropdown-item v-if="authenticated" v-on:click="logout()" id="logout">
            <font-awesome-icon icon="sign-out-alt" />
            <span>Sign out</span>
          </b-dropdown-item>
          <b-dropdown-item v-if="!authenticated" v-on:click="openLogin()" id="login">
            <font-awesome-icon icon="sign-in-alt" />
            <span>Sign in</span>
          </b-dropdown-item>
          <b-dropdown-item to="/register" tag="b-dropdown-item" id="register" v-if="!authenticated">
            <font-awesome-icon icon="user-plus" />
            <span>Register</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <b-row class='searchRow'>
    <b-col md="3" sm="3" lg=3>
      <h3>{{companyName}}</h3>
      </b-col>
    <b-col offset-lg="4" offset-md="2" md="7" sm="11" lg=5>
       <div class='search-bar'>
          <b-form-input placeholder="Search" @input="search()"
          v-on:change='searchTextChange()' 
          @keyup.enter.native="search()" 
          v-model='searchQuery'/>      
            <span @click='search()' class="search-icon">
              <font-awesome-icon 
                icon="search"/>
            </span>
       </div>
    </b-col> 
  </b-row>
  </div>
</template>

<script lang="ts" src="./jhi-navbar.component.ts">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* ==========================================================================
    Navbar
    ========================================================================== */
.navbar-version {
  font-size: 10px;
  color: #ccc;
}

.jh-navbar {
  background-color: #313D53;
  padding: 0.2em 1em;
}

.jh-navbar .profile-image {
  margin: -10px 0px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.jh-navbar .dropdown-item.active,
.jh-navbar .dropdown-item.active:focus,
.jh-navbar .dropdown-item.active:hover {
  background-color: #313D53;
}

.jh-navbar .dropdown-toggle::after {
  margin-left: 0.15em;
}

.jh-navbar ul.navbar-nav {
  padding: 0.2em;
}

.jh-navbar .navbar-nav .nav-item {
  margin-left: 1.5rem;
}

.jh-navbar a.nav-link {
  font-weight: 400;
}

.jh-navbar .jh-navbar-toggler {
  color: #ccc;
  font-size: 1.5em;
  padding: 10px;
}

.jh-navbar .jh-navbar-toggler:hover {
  color: #fff;
}
.data-dropdown {
  background-color: white !important;
  color: black !important;
  border: none;
  padding-left: 25px;
}
.searchTab {
  width:95%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid grey;
}
.searchRow {
  margin:10px;
  margin-left:20px;
}
h3{
  margin-left: 30px;
    font-weight: 700;
    font-style: normal;
    word-spacing: normal;
    font-size: x-large;
    color: darkblue;
}

@media screen and (min-width: 768px) {
  .jh-navbar-toggler {
    display: none;
  }
}

@media screen and (min-width: 768px) and (max-width: 1150px) {
  span span {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .jh-logo-container {
    width: 100%;
  }
}

.navbar-title {
  display: inline-block;
  vertical-align: middle;
  color: white;
}
/* waiting for bootstrap fix bug on nav-item-dropdown a:active
https://github.com/bootstrap-vue/bootstrap-vue/issues/2219
*/
nav li.router-link-active .navbar-dropdown-menu {
  cursor: pointer;
  color: #fff;
}

/* ==========================================================================
    Logo styles
    ========================================================================== */
.navbar-brand.logo {
  padding: 5px 15px;
}
.logoImage {
    height: 30px;
    width: 140px;
}
.logo {
  padding:0px;
}

.modal-content {
  border: 10px solid cadetblue !important;
  background: whitesmoke !important;
}
.search-bar {
  position: relative;
  box-shadow: 4px 3px 3px 3px #8888;
}
.search-bar input {
  padding-left: 30px;
}
.search-icon {
  position: absolute;
  top: 8px;
  left: 8px;
}
</style>
