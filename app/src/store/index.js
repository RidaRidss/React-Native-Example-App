// @flow

// ========IMPORTING '*' MEANS 'ALL' TO GET "REDUX STORAGE STATES FOR STORING DATA" FROM REDUX STORAGE  ===================

import * as storage from "redux-storage";

// ========IMPORTING CREATELOGGER TO CHECKS REDUX MIDDLEWARE DATA STORAGE STATE 'S LOGS IN DEBUGGING ===================

import { createLogger } from "redux-logger";

// ========IMPORTING CREATESAGAMIDDLEWARE TO CREATE SAGA MIDDLEWARE ================================

import createSagaMiddleware from "redux-saga";

// ======== IMPORTING FILTERS TO CHECK DATA IS WHITELISTED / BLACKLISTED IN STORAGE ENGINE ============

import filter from "redux-storage-decorator-filter";
import { composeWithDevTools } from "remote-redux-devtools";
import { createStore, applyMiddleware } from "redux";
import createEngine from "redux-storage-engine-reactnativeasyncstorage";
import sagas from "../sagas";

// ================== TO ENABLE DEBUGGING IN CHROME ================== //
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true
});

export default function configureStore(reducers, onComplete: Function) {
  const engine = filter(
    createEngine("AppTree"),
    // ======= here data is white listing means caching ======== //

    // note : if no need of any cache data usage when app starts we will not cache data and replace whitelisted-key to "blacklisted-key" 

    [
      "whitelisted-key",

      // ===================================================================================================================

      ["user", "data"]
    ],
    []
  );
  // ======================== REDUX STORAGE STATES WILL MERGE IN IN THIS STOREMIDDLEWARE ====================================

  const storeMiddleware = storage.createMiddleware(engine);

 // ==========================================================================================================================

 // ======================================== SAGA MIDDLEWARE WILL CALL HERE =================================================
   
  const sagaMiddleware = createSagaMiddleware();

// ====== creating store with Async Storage , saga middlewares and devtools for logs , debugging & more functionalities like hot reloading atc   
 
  const store = createStore(
    storage.reducer(reducers),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, storeMiddleware, logger)
    )
  );

  // ===================================================================================================================


  // ======== on debugging state fetching store ================= //

  if (isDebuggingInChrome) {
    window.store = store;
  }

  // ================= LOADING STORE , SAGA MIDDLEWARE WILL SERVE FIRST IN LOADING ===============================


  const load = storage.createLoader(engine);
  load(store)
    .then(onComplete)
    .catch(() =>
      console.log("Failed to load previous state @ configureStore.js#44")
    );

    // ====== saga middilewares , it will serve first in store

  sagaMiddleware.run(sagas);

  // ===================================================================================================================

  return store;
}
