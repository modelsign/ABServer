'use strict';
/*eslint-disable*/

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  
  router.get('/analysis', controller.pubABServer.analysis);
  
  router.get('/monitors', () => {});
  router.get('/clients', () => {});
  router.get('/monitors', () => {});
  router.get('/monitors', () => {});
  router.get('/monitors', () => {});
};
