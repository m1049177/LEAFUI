import bForm from 'bootstrap-vue/esm/components/form';
import bFormInput from 'bootstrap-vue/esm/components/form-input';
import bFormCheckbox from 'bootstrap-vue/esm/components/form-checkbox';
import bFormTextarea from 'bootstrap-vue/esm/components/form-textarea';
import bFormGroup from 'bootstrap-vue/esm/components/form-group';
import bProgress from 'bootstrap-vue/esm/components/progress';
import bProgressBar from 'bootstrap-vue/esm/components/progress';
import bPagination from 'bootstrap-vue/esm/components/pagination';
import bButton from 'bootstrap-vue/esm/components/button';
import bNavbar from 'bootstrap-vue/esm/components/navbar';
import bNavbarNav from 'bootstrap-vue/esm/components/navbar';
import bNavbarBrand from 'bootstrap-vue/esm/components/navbar';
import bNavbarToggle from 'bootstrap-vue/esm/components/navbar';
import bNavItem from 'bootstrap-vue/esm/components/nav';
import bNavItemDropdown from 'bootstrap-vue/esm/components/nav';
import bCollapse from 'bootstrap-vue/esm/components/collapse';
import bBadge from 'bootstrap-vue/esm/components/badge';
import bDropdown from 'bootstrap-vue/esm/components/dropdown';
import bDropdownItem from 'bootstrap-vue/esm/components/dropdown';
import bLink from 'bootstrap-vue/esm/components/link';
import bAlert from 'bootstrap-vue/esm/components/alert';
import bModal from 'bootstrap-vue/esm/components/modal';
import bModalDirective from 'bootstrap-vue/esm/directives/modal';
import bCardFooter from 'bootstrap-vue/esm/components/card';
import bCard from 'bootstrap-vue/esm/components/card/';
import bCardGroup from 'bootstrap-vue/esm/components/card';
import bCardHeader from 'bootstrap-vue/esm/components/card';
import bCardBody from 'bootstrap-vue/esm/components/card';
import bContainer from 'bootstrap-vue/esm/components/layout';
import bCol from 'bootstrap-vue/esm/components/layout';
import bRow from 'bootstrap-vue/esm/components/layout';
import bTable from 'bootstrap-vue/esm/components/table';
import bFormCheckboxGroup from 'bootstrap-vue/esm/components/form-checkbox';
import bTabs from 'bootstrap-vue/esm/components/tabs';
import bTab from 'bootstrap-vue/esm/components/tabs';

export function initBootstrapVue(vue: any) {
  vue.component('b-badge', bBadge);
  vue.component('b-dropdown', bDropdown);
  vue.component('b-dropdown-item', bDropdownItem);
  vue.component('b-link', bLink);
  vue.component('b-alert', bAlert);
  vue.component('b-modal', bModal);
  vue.component('b-button', bButton);
  vue.component('b-navbar', bNavbar);
  vue.component('b-navbar-nav', bNavbarNav);
  vue.component('b-navbar-brand', bNavbarBrand);
  vue.component('b-navbar-toggle', bNavbarToggle);
  vue.component('b-pagination', bPagination);
  vue.component('b-progress', bProgress);
  vue.component('b-progress-bar', bProgressBar);
  vue.component('b-form', bForm);
  vue.component('b-form-input', bFormInput);
  vue.component('b-form-group', bFormGroup);
  vue.component('b-form-checkbox', bFormCheckbox);
  vue.component('b-form-textarea', bFormTextarea);
  vue.component('b-collapse', bCollapse);
  vue.component('b-nav-item', bNavItem);
  vue.component('b-nav-item-dropdown', bNavItemDropdown);
  vue.directive('b-modal', bModalDirective);
  vue.component('b-card', bCard);
  vue.component('b-card-group', bCardGroup);
  vue.component('b-card-header', bCardHeader);
  vue.component('b-card-body', bCardBody);
  vue.component('b-card-footer', bCardFooter);
  vue.component('b-container', bContainer);
  vue.component('b-col', bCol);
  vue.component('b-row', bRow);
  vue.component('b-table', bTable);
  vue.component('b-form-checkbox-group', bFormCheckboxGroup);
  vue.component('b-tabs', bTabs);
  vue.component('b-tab', bTab);
}
