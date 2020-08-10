import Vuex, { Store } from 'vuex';
import { setupAxiosInterceptors } from './axios-interceptor';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons/faPenFancy';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faHdd } from '@fortawesome/free-solid-svg-icons/faHdd';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons/faTachometerAlt';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faTasks } from '@fortawesome/free-solid-svg-icons/faTasks';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faThList } from '@fortawesome/free-solid-svg-icons/faThList';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { faWrench } from '@fortawesome/free-solid-svg-icons/faWrench';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons/faAsterisk';
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faRoad } from '@fortawesome/free-solid-svg-icons/faRoad';
import { faCloud } from '@fortawesome/free-solid-svg-icons/faCloud';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons/faShieldAlt';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons/faShareSquare';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons/faBriefcase';
import { faLaptop } from '@fortawesome/free-solid-svg-icons/faLaptop';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons/faBoxOpen';
import { faHandshake } from '@fortawesome/free-solid-svg-icons/faHandshake';
import { faCoins } from '@fortawesome/free-solid-svg-icons/faCoins';
import { faServer } from '@fortawesome/free-solid-svg-icons/faServer';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons/faFilePdf';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes';
import { faListAlt } from '@fortawesome/free-solid-svg-icons/faListAlt';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons/faChalkboardTeacher';

import VueCookie from 'vue-cookies';
import Vuelidate from 'vuelidate';
import Vue2Filters from 'vue2-filters';

import * as filters from '../date/filters';

export function initVueApp(vue: any) {
  vue.use(VueCookie);
  vue.use(Vuelidate);
  vue.use(Vue2Filters);
  setupAxiosInterceptors(() => console.log('Unauthorized!'));
  filters.initFilters();
}

export function initFortAwesome(vue: any) {
  library.add(
    faSort,
    faEye,
    faSync,
    faBan,
    faTrash,
    faArrowLeft,
    faSave,
    faPlus,
    faPencilAlt,
    faPenFancy,
    faUser,
    faUsers,
    faTachometerAlt,
    faHeart,
    faList,
    faTasks,
    faBook,
    faHdd,
    faCogs,
    faLock,
    faSignInAlt,
    faSignOutAlt,
    faWrench,
    faThList,
    faUserPlus,
    faAsterisk,
    faFlag,
    faBell,
    faHome,
    faRoad,
    faCloud,
    faTimesCircle,
    faSearch,
    faBars,
    faTimes,
    faThumbsUp,
    faBuilding,
    faExclamationTriangle,
    faCloudUploadAlt,
    faShieldAlt,
    faShareSquare,
    faDownload,
    faBriefcase,
    faLaptop,
    faFolder,
    faChartLine,
    faCoins,
    faCode,
    faHandshake,
    faServer,
    faBoxOpen,
    faCloud,
    faFilePdf,
    faCubes,
    faListAlt,
    faChalkboardTeacher
  );
}

export function initVueXStore(vue: any) {
  vue.use(Vuex);
  return new Vuex.Store({
    state: {
      dismissSecs: 0,
      dismissCountDown: 0,
      alertType: '',
      alertMessage: {},
      logon: false,
      userIdentity: null,
      authenticated: false,
      ribbonOnProfiles: '',
      activeProfiles: ''
    },
    mutations: {
      initAlert(state) {
        state.dismissSecs = 0;
        state.dismissCountDown = 0;
        state.alertType = '';
        state.alertMessage = {};
      },
      setAlertType(state, alertType) {
        state.alertType = alertType;
      },
      setAlertMessage(state, alertMessage) {
        state.dismissSecs = 5;
        state.dismissCountDown = 5;
        state.alertMessage = alertMessage;
      },
      countDownChanged(state, newCountDown) {
        state.dismissCountDown = newCountDown;
      },
      authenticate(state) {
        state.logon = true;
      },
      authenticated(state, identity) {
        state.userIdentity = identity;
        state.authenticated = true;
        state.logon = false;
      },
      logout(state) {
        state.userIdentity = null;
        state.authenticated = false;
        state.logon = false;
      },
      setActiveProfiles(state, profile) {
        state.activeProfiles = profile;
      },
      setRibbonOnProfiles(state, ribbon) {
        state.ribbonOnProfiles = ribbon;
      }
    },
    getters: {
      dismissSecs: state => state.dismissSecs,
      dismissCountDown: state => state.dismissCountDown,
      alertType: state => state.alertType,
      alertMessage: state => state.alertMessage,
      logon: state => state.logon,
      account: state => state.userIdentity,
      authenticated: state => state.authenticated,
      activeProfiles: state => state.activeProfiles,
      ribbonOnProfiles: state => state.ribbonOnProfiles
    }
  });
}
